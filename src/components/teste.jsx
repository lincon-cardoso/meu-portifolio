"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mensagem, setMensagem] = useState("Carregando...");
  

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ping`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro na resposta da API");
        }
        return res.json();
      })
      .then((data) => setMensagem(data.mensagem))
      .catch((error) => {
        console.error("Erro ao chamar o API:", error);
        setMensagem("Erro ao conectar com o back-end");
      });
  }, []);

  return (
    <div>
      <h1>Status do back:</h1>
      <p>{mensagem}</p>
    </div>
  );
}
