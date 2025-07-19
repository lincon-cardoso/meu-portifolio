"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erro na autenticação");
        }
        const data = await response.json();
        window.location.href = data.redirect;
      })
      .catch((error) => {
        console.error("Erro ao chamar a API:", error);
        setErrorMessage(error.message);
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
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
              required
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <button type="submit" className="login-button">
            Entrar
          </button>
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
