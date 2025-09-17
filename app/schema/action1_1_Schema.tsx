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

      taxamount: z
        .string()
        .min(1, { message: "Tax amount is required" })
        .refine(
          (val) => {
            const numValue = parseFloat(val.replace(/[,$]/g, ""));
            return !isNaN(numValue) && numValue >= 0;
          },
          {
            message: "Please enter a valid tax amount.",
          }
        ),

      unfiledyears: z
        .string()
        .min(1, { message: "Number of unfiled years is required" })
        .refine(
          (val) => {
            const numValue = parseInt(val);
            return !isNaN(numValue) && numValue >= 0;
          },
          {
            message: "Please enter a valid number of years.",
          }
        ),

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
    )
    .refine(
      (data) => {
        const taxAmount = parseFloat(data.taxamount.replace(/[,$]/g, ""));
        const unfiledYears = parseInt(data.unfiledyears);

        // Either tax amount must be 10k+ OR unfiled years must be 1+
        return taxAmount >= 10000 || unfiledYears >= 1;
      },
      {
        message:
          "You must either owe at least $10,000 in taxes OR have at least 1 year of unfiled returns to proceed.",
        path: ["taxamount"], // Show error on tax amount field
      }
    );
