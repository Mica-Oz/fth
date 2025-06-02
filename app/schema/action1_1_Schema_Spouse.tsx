import { z } from "zod";

// Utility function for formatting text input
const toTitleCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Regex patterns
const dobPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
const ssnPattern = /^\d{3}-?\d{2}-?\d{4}$/;

export const action1_1_Spouse_Schema = z.object({
  sfname: z
    .string()
    .min(1, { message: "First name is required" })
    .regex(/^[A-Za-z'-]+$/, {
      message: "First name must be a single word with no spaces",
    })
    .refine((val) => !val.includes(" "), {
      message: "First name cannot contain spaces",
    })
    .transform((val) => toTitleCase(val)),
  // smname: z
  //   .string()
  //   .regex(/^[A-Za-z'-]+$/, {
  //     message: "Middle name must be a single word with no spaces",
  //   })
  //   .refine((val) => !val.includes(" "), {
  //     message: "Middle name cannot contain spaces",
  //   })
  //   .transform((val) => toTitleCase(val))
  //   .optional(),
  slname: z
    .string()
    .min(1, { message: "Last name is required" })
    .regex(/^[A-Za-z'-]+$/, {
      message: "Last name must be a single word with no spaces",
    })
    .refine((val) => !val.includes(" "), {
      message: "Last name cannot contain spaces",
    })
    .transform((val) => toTitleCase(val)),
  sdob: z
    .string()
    .min(1, { message: "Date of birth is required" })
    .regex(dobPattern, { message: "Date must be in MM/DD/YYYY format" }),
  sssn: z
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
  // CellPhone: z
  //   .string()
  //   .optional()
  //   .refine(
  //     (val) => {
  //       // If value is undefined or empty string, it's valid
  //       if (!val) return true;

  //       // Otherwise apply validation
  //       const digitsOnly = val.replace(/\D/g, "");
  //       return digitsOnly.length === 10 && /^\d+$/.test(digitsOnly);
  //     },
  //     {
  //       message: "Phone number must be 10 digits",
  //     }
  //   )
  //   .transform((val) => {
  //     // If no value, return undefined
  //     if (!val) return undefined;

  //     // Otherwise sanitize to just digits
  //     return val.replace(/\D/g, "");
  //   }),
});
