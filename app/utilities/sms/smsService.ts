// app/utilities/sms/smsService.ts
import AWS from "aws-sdk";
import crypto from "crypto";

// Configure AWS SNS - will use your environment variables
const sns = new AWS.SNS({
  region: process.env.AWS_REGION || "us-west-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

interface OTPData {
  phoneNumber: string;
  code: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
  caseId?: string;
}

interface RateLimitData {
  count: number;
  resetAt: Date;
}

export class CustomSMSService {
  private otpStore = new Map<string, OTPData>();
  private rateLimitStore = new Map<string, RateLimitData>();

  // Settings
  private readonly SMS_RATE_LIMIT = 5;
  private readonly SMS_RATE_WINDOW = 60 * 60 * 1000; // 1 hour
  private readonly OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_VERIFICATION_ATTEMPTS = 3;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  private generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  private getOTPKey(phoneNumber: string): string {
    return `otp:${phoneNumber.replace(/\D/g, "")}`;
  }

  private getRateLimitKey(phoneNumber: string): string {
    return `rate_limit:${phoneNumber.replace(/\D/g, "")}`;
  }

  private normalizePhoneNumber(phoneNumber: string): string {
    const cleaned = phoneNumber.replace(/\D/g, "");
    return cleaned.length === 10 ? `+1${cleaned}` : `+${cleaned}`;
  }

  private checkRateLimit(phoneNumber: string): {
    allowed: boolean;
    resetAt?: Date;
  } {
    const rateLimitKey = this.getRateLimitKey(phoneNumber);
    const rateLimit = this.rateLimitStore.get(rateLimitKey);
    const now = new Date();

    if (!rateLimit) {
      return { allowed: true };
    }

    if (now > rateLimit.resetAt) {
      this.rateLimitStore.delete(rateLimitKey);
      return { allowed: true };
    }

    if (rateLimit.count >= this.SMS_RATE_LIMIT) {
      return { allowed: false, resetAt: rateLimit.resetAt };
    }

    return { allowed: true };
  }

  private updateRateLimit(phoneNumber: string): void {
    const rateLimitKey = this.getRateLimitKey(phoneNumber);
    const rateLimit = this.rateLimitStore.get(rateLimitKey);
    const now = new Date();

    if (!rateLimit || now > rateLimit.resetAt) {
      this.rateLimitStore.set(rateLimitKey, {
        count: 1,
        resetAt: new Date(now.getTime() + this.SMS_RATE_WINDOW),
      });
    } else {
      rateLimit.count++;
      this.rateLimitStore.set(rateLimitKey, rateLimit);
    }
  }

  async sendSMS(
    phoneNumber: string,
    message: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const normalizedPhone = this.normalizePhoneNumber(phoneNumber);

      const params = {
        Message: message,
        PhoneNumber: normalizedPhone,
        MessageAttributes: {
          "AWS.SNS.SMS.SMSType": {
            DataType: "String",
            StringValue: "Transactional",
          },
        },
      };

      const result = await sns.publish(params).promise();

      return {
        success: true,
        messageId: result.MessageId,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("SMS send failed:", {
        error: error.message,
        phoneNumber: phoneNumber.replace(/\d/g, "*"),
        timestamp: new Date().toISOString(),
      });

      return {
        success: false,
        error: this.getErrorMessage(error),
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getErrorMessage(error: any): string {
    if (error.code === "InvalidParameter") {
      return "Invalid phone number format";
    }
    if (error.code === "OptedOut") {
      return "Phone number has opted out of SMS messages";
    }
    if (error.code === "Throttling") {
      return "Too many messages sent. Please try again later";
    }

    return "Failed to send verification code. Please try again";
  }

  // Main method - replaces stytch.otps.sms.send()
  async sendOTP(
    phoneNumber: string,
    caseId?: string
  ): Promise<{
    success: boolean;
    method_id?: string; // Stytch compatibility
    error?: string;
    retryAfter?: number;
  }> {
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    const methodId = crypto.randomUUID(); // Generate method_id like Stytch

    // Validate US phone number format (matching your current validation)
    if (cleanPhone.length !== 10) {
      return {
        success: false,
        error: "Invalid phone number format",
      };
    }

    // Check rate limiting
    const rateLimitCheck = this.checkRateLimit(cleanPhone);
    if (!rateLimitCheck.allowed) {
      const retryAfter = rateLimitCheck.resetAt
        ? Math.ceil((rateLimitCheck.resetAt.getTime() - Date.now()) / 1000)
        : 3600;

      return {
        success: false,
        error: `Too many SMS requests. Try again in ${Math.ceil(
          retryAfter / 60
        )} minutes.`,
        retryAfter,
      };
    }

    const otpKey = this.getOTPKey(cleanPhone);
    const existing = this.otpStore.get(otpKey);

    // Check verification attempt lockout
    if (
      existing &&
      existing.attempts >= this.MAX_VERIFICATION_ATTEMPTS &&
      existing.createdAt > new Date(Date.now() - this.LOCKOUT_DURATION)
    ) {
      const retryAfter = Math.ceil(
        (existing.createdAt.getTime() + this.LOCKOUT_DURATION - Date.now()) /
          1000
      );
      return {
        success: false,
        error: `Too many verification attempts. Try again in ${Math.ceil(
          retryAfter / 60
        )} minutes.`,
        retryAfter,
      };
    }

    const code = this.generateOTP();
    const expiresAt = new Date(Date.now() + this.OTP_EXPIRY);

    // Store OTP data
    const shouldResetAttempts =
      !existing ||
      existing.createdAt <= new Date(Date.now() - this.LOCKOUT_DURATION);

    const otpData = {
      phoneNumber: cleanPhone,
      code,
      expiresAt,
      attempts: shouldResetAttempts ? 0 : existing.attempts,
      createdAt: shouldResetAttempts ? new Date() : existing.createdAt,
      caseId,
    };

    // Store by method_id for verification lookup
    this.otpStore.set(methodId, otpData);
    // Also store by phone for rate limiting
    this.otpStore.set(otpKey, otpData);

    // Send SMS
    const message = `Your FreeTaxHistory verification code is ${code}. Valid for 5 minutes. Don't share this code.`;
    const smsResult = await this.sendSMS(cleanPhone, message);

    if (!smsResult.success) {
      return {
        success: false,
        error: smsResult.error,
      };
    }

    // Update rate limit only on successful send
    this.updateRateLimit(cleanPhone);

    console.log("OTP sent successfully:", {
      methodId,
      phoneNumber: cleanPhone.replace(/\d(?=\d{4})/g, "*"),
      messageId: smsResult.messageId,
      caseId,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      method_id: methodId,
    };
  }

  // Main method - replaces stytch.otps.authenticate()
  async authenticate(
    code: string,
    methodId: string
  ): Promise<{
    success: boolean;
    error?: string;
    attemptsRemaining?: number;
    phoneNumber?: string;
    caseId?: string;
  }> {
    const stored = this.otpStore.get(methodId);

    if (!stored) {
      return {
        success: false,
        error: "No verification code found. Please request a new code.",
      };
    }

    if (stored.expiresAt < new Date()) {
      this.otpStore.delete(methodId);
      // Also clean up phone-based storage
      const otpKey = this.getOTPKey(stored.phoneNumber);
      this.otpStore.delete(otpKey);
      return {
        success: false,
        error: "Verification code has expired. Please request a new code.",
      };
    }

    // Increment attempts
    stored.attempts++;
    this.otpStore.set(methodId, stored);

    // Also update phone-based storage for rate limiting
    const otpKey = this.getOTPKey(stored.phoneNumber);
    this.otpStore.set(otpKey, stored);

    if (stored.code !== code) {
      const attemptsRemaining = Math.max(
        0,
        this.MAX_VERIFICATION_ATTEMPTS - stored.attempts
      );

      if (attemptsRemaining === 0) {
        return {
          success: false,
          error:
            "Too many incorrect attempts. Please request a new verification code.",
          attemptsRemaining: 0,
        };
      }

      return {
        success: false,
        error: `Invalid verification code. ${attemptsRemaining} attempts remaining.`,
        attemptsRemaining,
      };
    }

    // Success - clean up
    this.otpStore.delete(methodId);
    this.otpStore.delete(otpKey);

    console.log("OTP verified successfully:", {
      phoneNumber: stored.phoneNumber.replace(/\d(?=\d{4})/g, "*"),
      attempts: stored.attempts,
      caseId: stored.caseId,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      phoneNumber: stored.phoneNumber,
      caseId: stored.caseId,
    };
  }

  cleanupExpiredOTPs(): void {
    const now = new Date();

    // Clean expired OTPs
    for (const [key, data] of this.otpStore.entries()) {
      if (data.expiresAt < now) {
        this.otpStore.delete(key);
      }
    }

    // Clean expired rate limits
    for (const [key, data] of this.rateLimitStore.entries()) {
      if (data.resetAt < now) {
        this.rateLimitStore.delete(key);
      }
    }
  }
}

// Singleton instance
export const smsService = new CustomSMSService();

// Clean up expired data every 5 minutes
setInterval(() => {
  smsService.cleanupExpiredOTPs();
}, 5 * 60 * 1000);
