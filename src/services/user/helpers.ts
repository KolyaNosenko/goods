export function isEmailValid(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}

export function isPasswordValid(password: string): boolean {
  return !!(password && typeof password === "string" && password.length >= 5);
}
