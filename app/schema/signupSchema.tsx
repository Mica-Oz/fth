import { z } from "zod";

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const signupSchema = z.object({
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
  // CellPhone: z
  //   .string()
  //   .min(10, { message: "Phone number must be 10 digits" })
  //   .max(10, { message: "Phone number must be 10 digits" })
  //   .regex(/^\d+$/, { message: "Phone number must be numeric" }),
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
});
