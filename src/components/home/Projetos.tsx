"use client";

import useSWR from "swr";
import { Projeto } from "@/types/Projeto";
import "@/style/pages/projects/projetos-cards.scss";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Erro ao carregar projetos");
    return res.json();
  });

export function Projetos() {
  const { data: projetos = [], error } = useSWR<Projeto[]>(
    "/api/projetos",
    fetcher
  );

  if (!projetos) return <p>Carregando projetos destacados...</p>;
  if (error) return <p>Erro ao carregar projetos destacados.</p>;

  return (
    <div className="cards-container">
      {projetos.length === 0 ? (
        <p>Nenhum projeto destacado encontrado.</p>
      ) : (
        projetos.map((p) => (
          <div className="card" key={p.id} data-category={p.category}>
            <div
              className="card-image"
              style={{ backgroundImage: `url(${p.imagem})` }}
            ></div>
            <h3 className="card-title">{p.titulo}</h3>
            <p className="card-description">{p.descricao}</p>
          </div>
        ))
      )}
    </div>
  );
}
