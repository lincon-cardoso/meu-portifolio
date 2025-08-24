"use client";

import React, { useState } from "react";
import Cabecalho from "../../components/layout/Cabecalho";
import Rodape from "../../components/layout/Rodape";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [status, setStatus] = useState(""); // Para feedback ao usuário
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("Enviando...");
    // teste
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        // teste
      });

      if (response.ok) {
        setStatus("Mensagem enviada com sucesso!");
        setFormData({ nome: "", email: "", assunto: "", mensagem: "" }); // Limpa o formulário
      } else {
        const errorData = await response.json();
        setStatus(`Falha ao enviar: ${errorData.error || "Erro no servidor"}`);
      }
    } catch {
      setStatus("Falha ao enviar a mensagem. Tente novamente.");
    } finally {
      setIsSending(false);
      // Opcional: Limpar a mensagem de status após alguns segundos
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <>
      {/* Cabeçalho */}
      <Cabecalho />
      <main className="fade-in">
        <section className="contato">
          <div className="container">
            <h2 className="contato-title">Entre em Contato</h2>
            <p className="contato-description">
              Tem interesse nos meus serviços ou quer discutir um projeto?
              Preencha o formulário abaixo e entrarei em contato o mais breve
              possível.
            </p>

            <div className="contato-grid">
              {/* Informações de Contato */}
              <div className="contato-info">
                <div className="contato-item">
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                  <h3>E-mail</h3>
                  <p>
                    <a
                      href="mailto:linkon789@gmail.com"
                      className="contato-link"
                    >
                      linkon789@gmail.com
                    </a>
                  </p>
                </div>

                <div className="contato-item">
                  <i className="fas fa-phone" aria-hidden="true"></i>
                  <h3>Telefone</h3>
                  <p>
                    <a href="tel:+5547999367604" className="contato-link">
                      (47) 9 9936-7604
                    </a>
                  </p>
                </div>

                <div className="contato-item">
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                  <h3>Localização</h3>
                  <p>Joinville, SC - Brasil</p>
                </div>
              </div>

              {/* Formulário de Contato */}
              <form className="contato-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Seu nome completo"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="seu.email@exemplo.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="assunto">Assunto</label>
                  <input
                    type="text"
                    id="assunto"
                    name="assunto"
                    placeholder="Do que se trata?"
                    required
                    value={formData.assunto}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mensagem">Mensagem</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    placeholder="Escreva sua mensagem aqui..."
                    required
                    value={formData.mensagem}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="contato-button"
                  disabled={isSending}
                >
                  {isSending ? "Enviando..." : "Enviar Mensagem"}
                </button>
                {status && (
                  <p
                    className="contato-status"
                    aria-live="polite"
                    role="status"
                  >
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      {/* Rodapé */}
      <Rodape />
    </>
  );
}
