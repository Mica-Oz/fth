import { z } from "zod";

const toCamelCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "");

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
    .transform((val) => toCamelCase(val)),
  LastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .regex(/^[A-Za-z\s'-]+$/, {
      message: "First name must not contain numbers or symbols",
    })
    .transform((val) => toCamelCase(val)),
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
