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
const zipPattern = /^\d{5}(-\d{4})?$/;

export const createAction1_1_Schema = (userData: { maritalStatus: string }) =>
  z
    .object({
      // Taxpayer Information
      FirstName: z
        .string()
        .min(1, { message: "First name is required" })
        .regex(/^[A-Za-z'-]+$/, {
          message: "First name must be a single word with no spaces",
        })
        .refine((val) => !val.includes(" "), {
          message: "First name cannot contain spaces",
        })
        .transform((val) => toTitleCase(val))
        .optional(),

      LastName: z
        .string()
        .min(1, { message: "Last name is required" })
        .regex(/^[A-Za-z'-]+$/, {
          message: "Last name must be a single word with no spaces",
        })
        .refine((val) => !val.includes(" "), {
          message: "Last name cannot contain spaces",
        })
        .transform((val) => toTitleCase(val))
        .optional(),
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

      // Primary taxpayer question (only required for married filing jointly)
      primary: z.string().optional(),

      taxamount: z.string().min(1, { message: "Answer is required" }),
      // Address fields
      address: z
        .string()
        .min(1, { message: "Street address is required" })
        .transform((val) => toTitleCase(val)),

      aptno: z.string().optional(),

      city: z
        .string()
        .min(1, { message: "City is required" })
        .transform((val) => toTitleCase(val)),

      state: z
        .string()
        .min(1, { message: "State is required" })
        .min(2, { message: "Please use state abbreviation (e.g., CA, NY)" })
        .max(2, { message: "Please use state abbreviation (e.g., CA, NY)" })
        .transform((val) => val.toUpperCase()),

      zip: z
        .string()
        .min(1, { message: "Zip code is required" })
        .regex(zipPattern, { message: "Enter a valid zip code" }),
    })
    .refine(
      (data) => {
        if (userData.maritalStatus !== "Married Filing Jointly") {
          return true;
        }
        return !!data.primary; // Check if primary is filled when married filing jointly
      },
      {
        message: "Question required",
        path: ["primary"],
      }
    );
