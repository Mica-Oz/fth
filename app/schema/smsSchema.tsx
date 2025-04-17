import { z } from "zod";

export const smsSchema = z.object({
  CellPhone: z
    .string()
    .transform((val) => val.replace(/\D/g, "")) // Strip all non-digit characters
    .pipe(
      z
        .string()
        .min(10, { message: "Phone number must be 10 digits" })
        .max(10, { message: "Phone number must be 10 digits" })
        .regex(/^\d+$/, { message: "Phone number must be numeric" })
    ),
});

export const smsAuthSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "One Time Passcode must be 6 digits" })
    .max(6, { message: "One Time Passcode must be 6 digits" })
    .regex(/^\d+$/, { message: "One Time Passcode must be numeric" }),
});
