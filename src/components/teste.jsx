"use client";

import { useState, useEffect } from "react";

const API_URL = "https://back-end-portifolio-production.up.railway.app";

export default function Home() {
  const [mensagem, setMensagem] = useState("Carregando...");

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const response = await fetch(`${API_URL}/ping`);
        if (!response.ok) {
          throw new Error("Erro ao chamar a API");
        }
        const data = await response.json();
        setMensagem(data.mensagem);
      } catch (error) {
        console.error("Erro ao chamar a API:", error);
        setMensagem("Erro ao conectar com o servidor");
      }
    };

    fetchPing();
  }, []);

  return (
    <main>
      <h1>Status do back:</h1>
      <p>{mensagem}</p>
    </main>
  );
}
