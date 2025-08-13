export interface Projeto {
  id: string;
  nome?: string;
  titulo?: string;
  name?: string;
  descricao?: string;
  category?: string;
  tecnologias?: string[];
  link?: string;
  linkGithub?: string;
  destaque?: boolean;
  criadoEm: string; // Adicionado para compatibilidade
  usuarioId: string; // Adicionado para compatibilidade
}
