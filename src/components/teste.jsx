
"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [mensagem, setMensagem] = useState('Carregando...');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_TEST_API_URL}/ping`)
      .then((res) => res.json())
      .then((data) => setMensagem(data.mensagem))
      .catch(() => setMensagem('Erro ao conectar com o back-end'));
  }, []);

  return (
    <div>
      <h1>Status do back-end:</h1>
      <p>{mensagem}</p>
    </div>
  );
}
