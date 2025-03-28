import HomePage from "@/components/HomePage";
import Cabecalho from "@/components/layout/Cabecalho"; // Ensure that the file exists at this path
import Rodape from "@/components/layout/Rodape"; // Ensure that the file exists at this path

export default function Home() {
  return (
    <main>
      {/* Cabeçalho Global */}
      <Cabecalho />

      {/* Conteúdo das páginas */}
      <HomePage />

      {/* Rodapé Global */}
      <Rodape />
      
    </main>
  );
}
