import { z } from "zod";

export const action3_3_Schema = z.object({
  tpWages: z
    .string()
    .min(1, { message: "Wages are required" })
    .regex(/^\d+$/, { message: "Please enter numbers only" }),
  tpSocialSecurity: z
    .string()
    .min(1, { message: "Social Security is required" })
    .regex(/^\d+$/, { message: "Please enter numbers only" }),
  tpPension: z
    .string()
    .min(1, { message: "Pension is required" })
    .regex(/^\d+$/, { message: "Please enter numbers only" }),
  spWages: z
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
  spSocialSecurity: z
    .string()
    .optional()
    .refine(
      (val) => {
        // If value is undefined or empty string, it's valid
        if (!val) return true;
        // Otherwise apply validation
        const digitsOnly = val.replace(/\D/g, "");
        return /^\d+$/.test(digitsOnly);
      },
      {
        message: "Please enter numbers only",
      }
    )
    .transform((val) => {
      // If no value, return undefined
      if (!val) return undefined;

      // Otherwise sanitize to just digits
      return val.replace(/\D/g, "");
    }),
  spPension: z
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
