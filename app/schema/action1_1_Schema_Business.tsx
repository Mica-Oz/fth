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
const einPattern = /^\d{2}-?\d{7}$/;
const zipPattern = /^\d{5}(-\d{4})?$/;

export const action1_1_Business_Schema = z.object({
  BusinessName: z
    .string()
    .min(1, { message: "Business Name is required" })
    .transform((val) => toTitleCase(val)),
  BusinessType: z.string().min(1, { message: "Type is required" }),

  BusinessEIN: z
    .string()
    .min(1, { message: "EIN is required" })
    .regex(einPattern, { message: "EIN must be in XX-XXXXXXX format" })
    .transform((val) => {
      // Normalize EIN format (add dash if it's missing)
      if (val.length === 9) {
        return `${val.slice(0, 2)}-${val.slice(2)}`;
      }
      return val;
    }),
  // Address fields
  BusinessAddress: z
    .string()
    .min(1, { message: "Street address is required" })
    .transform((val) => toTitleCase(val)),

  BusinessAptNo: z.string().optional(),

  BusinessCity: z
    .string()
    .min(1, { message: "City is required" })
    .transform((val) => toTitleCase(val)),

  BusinessState: z
    .string()
    .min(1, { message: "State is required" })
    .min(2, { message: "Please use state abbreviation (e.g., CA, NY)" })
    .max(2, { message: "Please use state abbreviation (e.g., CA, NY)" })
    .transform((val) => val.toUpperCase()),

  BusinessZip: z
    .string()
    .min(1, { message: "Zip code is required" })
    .regex(zipPattern, { message: "Enter a valid zip code" }),
});
