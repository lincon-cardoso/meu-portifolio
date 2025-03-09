"use client";

import React from "react";
import Link from "next/link";

export default function ContatoPage() {
  return (
    <>
      {/* Cabeçalho */}
      <header className="header fade-in">
        <div className="header-container">
          <div className="header-profile">
            <div className="profile-photo"></div>
            <Link href="/" className="profile-name">
              Meu Portfólio Pessoal
            </Link>
          </div>
          <nav className="header-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/meuProjetos" className="nav-link">
                  Meus Projetos
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/sobre" className="nav-link">
                  Sobre Mim
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contato" className="nav-link active">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
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
                  <p>exemplo@email.com</p>
                </div>
                <div className="contato-item">
                  <i className="fas fa-phone"></i>
                  <h3>Telefone</h3>
                  <p>(00) 12345-6789</p>
                </div>
                <div className="contato-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <h3>Localização</h3>
                  <p>São Paulo, SP - Brasil</p>
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
      <footer className="fade-in">
        <div className="footer-container">
          <p className="footer-text">
            &copy; 2025 Lincon Cardoso. Todos os direitos reservados.
          </p>
          <p className="redes-Sociais">Siga-me nas redes sociais</p>
          <div className="social-icons">
            <Link href="#" className="social-icon" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="social-icon" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="social-icon" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="social-icon" aria-label="GitHub">
              <i className="fab fa-github"></i>
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
