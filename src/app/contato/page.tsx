"use client";

import React from "react";
import useProjectFilter from "../../hooks/useProjectFilter";
import Cabecalho from "../../components/layout/Cabecalho";
import Rodape from "../../components/layout/Rodape";


export default function ContatoPage() {
  // Executa o hook para manipulação do filtro ou do formulário após a montagem, sem afetar a renderização inicial.
  useProjectFilter();


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
                  <i className="fas fa-envelope"></i>
                  <h3>E-mail</h3>
                  <p>linkon789@gmail.com</p>
                </div>
                <div className="contato-item">
                  <i className="fas fa-phone"></i>
                  <h3>Telefone</h3>
                  <p>(47) 9 9936-7604</p>
                </div>
                <div className="contato-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <h3>Localização</h3>
                  <p>Joinville, SC - Brasil</p>
                </div>
              </div>
              {/* Formulário de Contato */}
              <form className="contato-form">
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Seu nome completo"
                    required
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
                  ></textarea>
                </div>
                <button type="submit" className="contato-button">
                  Enviar Mensagem
                </button>
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