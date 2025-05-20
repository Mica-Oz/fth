import { z } from "zod";

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    FirstName: z
      .string()
      .min(1, { message: "First name is required" })
      .regex(/^[A-Za-z\s'-]+$/, {
        message: "First name must not contain numbers or symbols",
      })
      .transform((val) => toTitleCase(val)),
    LastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .regex(/^[A-Za-z\s'-]+$/, {
        message: "First name must not contain numbers or symbols",
      })
      .transform((val) => toTitleCase(val)),
    TAX_RELIEF_TAX_TYPE: z.string().min(1, { message: "Tax Type is required" }),
    Marital_Status: z.string().optional(),
    agreeToTerms: z
      .boolean({
        required_error: "You must agree to the terms and privacy policy",
      })
      .refine((val) => val === true, {
        message: "You must agree to the terms and privacy policy",
      }),
    statusID: z.string().optional(),
    statusName: z.string().optional(),
    SETOfficerName: z.string().optional(),
    SMSPermit: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // If tax type is "Business", we don't need Marital_Status
      if (
        data.TAX_RELIEF_TAX_TYPE === "Business" ||
        data.TAX_RELIEF_TAX_TYPE === "Personal and Business"
      ) {
        return true;
      }

      // For any other tax type, Marital_Status is required
      return data.Marital_Status && data.Marital_Status.length > 0;
    },
    {
      message: "Marital Status is required for this tax type",
      path: ["Marital_Status"], // This ensures the error is shown on the Marital_Status field
    }
  );
