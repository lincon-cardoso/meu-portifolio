"use client";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password: senha,
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou senha inválidos.");
      setIsLoading(false);
    } else {
      router.replace("/dashboard");
    }
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="form-input"
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          className="form-input"
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>
      <button className="login-button" type="submit" disabled={isLoading}>
        {isLoading ? "Carregando..." : "Entrar"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
