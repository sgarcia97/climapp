function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isComplexPassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const specialCharacters = "!@#$%^&*()_+[]{};':\"\\|,.<>?/~`";

  if (password.length < 8) {
    errors.push("must be at least 8 characters long.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("must contain at least one lowercase letter (a-z).");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("must contain at least one uppercase letter (A-Z).");
  }
  if (!/\d/.test(password)) {
    errors.push("must contain at least one number (0-9).");
  }

  if (![...password].some((char) => specialCharacters.includes(char))) {
    errors.push(
      `must contain at least one special character (${specialCharacters}).`
    );
  }

  return { valid: errors.length === 0, errors };
}

export { isValidEmail, isComplexPassword };
