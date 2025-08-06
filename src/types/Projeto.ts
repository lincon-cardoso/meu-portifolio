export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  imagem?: string | null;
  category: string;
  tecnologias: string[];
  link?: string | null;
  linkGithub?: string | null;
  criadoEm: string;
  usuarioId: string;
}
