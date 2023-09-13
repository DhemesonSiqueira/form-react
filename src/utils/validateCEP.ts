export function validateCEP(zipcode: string) {
  const isValidCEP = /^[0-9]{8}$/.test(zipcode);
  return isValidCEP;
}