// src/app/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/utils/validation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                console.log("Login realizado com sucesso!");
            } else {
                console.error("Erro no login.");
            }
        } catch (error) {
            console.error("Erro ao conectar ao servidor:", error);
        }
    };

    const handleLogout = () => {
        router.push("/");
    };

    return (
        <div className="login-container fade-in">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <div className="button-group">
                    <button type="submit" className="login-button">Entrar</button>
                    <button type="button" className="logout-button" onClick={handleLogout}>Sair</button>
                </div>
            </form>
        </div>
    );
}