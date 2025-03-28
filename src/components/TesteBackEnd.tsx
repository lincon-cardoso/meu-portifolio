import React, { useEffect } from "react";

export default function TesteBackEnd() {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teste`)
      .then((res) => res.json())
      .then((data) => console.log("Resposta do back-end:", data))
      .catch((err) => console.error("Erro de conexão com o back-end:", err));
  }, []);

  return (
    <div>
      <p>
        Testando chamada ao back-end... Verifique o console para a resposta.
      </p>
    </div>
  );
}
