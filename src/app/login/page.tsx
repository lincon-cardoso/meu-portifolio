"use client";

import React, { useState, useEffect } from "react";
// import { validateEmail, validatePassword } from "@/utils/validation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação de email e senha
        const emailError = !email.includes("@") ? "Email inválido." : "";
        const passwordError = password.length < 6 ? "A senha deve ter pelo menos 6 caracteres." : "";

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }), // Incluindo a senha no corpo da requisição
            });

            if (response.ok) {
                console.log("Login registrado com sucesso!");
            } else {
                console.error("Erro ao registrar login.");
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="login-container fade-in">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <button type="submit" className="login-button">
                    Entrar
                </button>
            </form>
        </div>
    );
}