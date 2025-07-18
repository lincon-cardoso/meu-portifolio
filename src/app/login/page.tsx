"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   fetch("/api/login", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ email, password }),
   })
     .then((response) => {
       if (!response.ok) {
         throw new Error("Erro na autenticação");
       }
       return response.json();
     })
     .then((data) => {
       console.log("Resposta da API:", data);
       if (data.message === "Login successful") {
         console.log("Login bem-sucedido!");
       } else {
         console.error("Credenciais inválidas:", data);
       }
     })
     .catch((error) => {
       console.error("Erro ao chamar a API:", error);
       alert("Erro ao fazer login. Tente novamente.");
     });
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Entrar
          </button>
          {/* crie um botao de sair para voltar para o / */}
          <button
            type="button"
            className="login-button"
            onClick={() => (window.location.href = "/")}
          >
            Sair
          </button>
        </form>
      </div>
    </main>
  );
}
