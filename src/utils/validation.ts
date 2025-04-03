export function validateEmail(email: string): string | undefined {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "O email é obrigatório.";
  if (email.length > 254) return "O email não pode exceder 254 caracteres.";
  if (!emailRegex.test(email)) return "O email não é válido.";
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) return "A senha é obrigatória.";
  if (password.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
  if (password.length > 128) return "A senha não pode exceder 128 caracteres.";
  if (!/[A-Z]/.test(password)) return "A senha deve conter pelo menos uma letra maiúscula.";
  if (!/[0-9]/.test(password)) return "A senha deve conter pelo menos um número.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "A senha deve conter pelo menos um caractere especial.";
  return undefined;
}