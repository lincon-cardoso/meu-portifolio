"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [mensagem, setMensagem] = useState('Carregando...');

  useEffect(() => {
    fetch(`${process.env.FRONTEND_URL}/ping`)
      .then((res) => res.json())
      .then((data) => setMensagem(data.mensagem))
      .catch(() => setMensagem('Erro ao conectar com o back-end'));
  }, []);

  return (
    <div>
      <h1>Status do back:</h1>
      <p>{mensagem}</p>
    </div>
  );
}
