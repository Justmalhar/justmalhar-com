export function validateEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);

  if (!isValid) {
    throw new Error('Enter a valid email address.');
  }

  return normalized;
}
