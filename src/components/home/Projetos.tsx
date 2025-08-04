"use client";

import { useEffect, useState } from "react";
import { Projeto } from "@/types/Projeto";
import "@/style/pages/projects/projetos-cards.scss";

export function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarProjetos() {
      const res = await fetch("/api/projetos");
      if (res.ok) {
        const data = await res.json();
        setProjetos(data);
      }
      setLoading(false);
    }

    carregarProjetos();
  }, []);

  return (
    <div className="cards-container">
      {loading ? (
        <p>Carregando...</p>
      ) : projetos.length === 0 ? (
        <p>Nenhum projeto encontrado.</p>
      ) : (
        projetos.map((p) => (
          <div className="card" key={p.id} data-category={p.categoria}>
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
