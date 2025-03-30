// Função para validar um endereço de email
export function validateEmail(email: string): string | undefined {
  // Verifica se o email foi fornecido
  if (!email) return "O email é obrigatório.";

  // Expressão regular para validar o formato do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Verifica se o email corresponde ao formato esperado
  if (!emailRegex.test(email)) return "O email não é válido.";

  // Retorna undefined se não houver erros
  return undefined;
}

// Função para validar uma senha
export function validatePassword(password: string): string | undefined {
  // Verifica se a senha foi fornecida
  if (!password) return "A senha é obrigatória.";

  // Verifica se a senha tem pelo menos 6 caracteres
  if (password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";

  // Retorna undefined se não houver erros
  return undefined;
}