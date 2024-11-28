import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export function validateAndFormatPhone(input: string): { 
  isValid: boolean;
  formatted: string;
  e164?: string;
} {
  try {
    // Always treat as US number if no country code provided
    const phoneInput = input.startsWith('+') ? input : `+1${input.replace(/\D/g, '')}`;
    
    if (!isValidPhoneNumber(phoneInput)) {
      return { isValid: false, formatted: input };
    }

    const phone = parsePhoneNumber(phoneInput);
    return {
      isValid: true,
      formatted: phone.formatNational(), // Using formatNational() instead of formatPhoneNumber
      e164: phone.format('E.164')
    };
  } catch {
    return { isValid: false, formatted: input };
  }
}