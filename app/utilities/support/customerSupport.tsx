// app/utilities/support/customerSupport.ts
export const PHONE_EXEMPT_USERS = [
  "14226",
  //"14227", // Customer service cases
];

export function isPhoneExempt(caseId: string | undefined): boolean {
  if (!caseId) return false; // Handle undefined case
  return PHONE_EXEMPT_USERS.includes(caseId);
}
