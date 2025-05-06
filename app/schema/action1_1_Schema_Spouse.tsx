import { z } from "zod";

// Utility function for formatting text input
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Regex patterns
const dobPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
const ssnPattern = /^\d{3}-?\d{2}-?\d{4}$/;

export const action1_1_Spouse_Schema = z.object({
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
      message: "Last name must not contain numbers or symbols",
    })
    .transform((val) => toTitleCase(val)),
  dob: z
    .string()
    .min(1, { message: "Date of birth is required" })
    .regex(dobPattern, { message: "Date must be in MM/DD/YYYY format" }),
  ssn: z
    .string()
    .min(1, { message: "SSN is required" })
    .regex(ssnPattern, { message: "SSN must be in XXX-XX-XXXX format" })
    .transform((val) => {
      // Normalize SSN format (add dashes if they're missing)
      if (val.length === 9) {
        return `${val.slice(0, 3)}-${val.slice(3, 5)}-${val.slice(5)}`;
      }
      return val;
    }),
  CellPhone: z
    .string()
    .optional()
    .refine(
      (val) => {
        // If value is undefined or empty string, it's valid
        if (!val) return true;

        // Otherwise apply validation
        const digitsOnly = val.replace(/\D/g, "");
        return digitsOnly.length === 10 && /^\d+$/.test(digitsOnly);
      },
      {
        message: "Phone number must be 10 digits",
      }
    )
    .transform((val) => {
      // If no value, return undefined
      if (!val) return undefined;

      // Otherwise sanitize to just digits
      return val.replace(/\D/g, "");
    }),
});
