// Rota legacy temporária: manter para não quebrar deploys antigos.
// Pode ser removida após garantir que apenas /projetos/[id] (slug lógico) é usado.
export default function LegacyProjetoSlugFallback() {
  return null; // Não faz nada. Poderia redirecionar se necessário.
}
