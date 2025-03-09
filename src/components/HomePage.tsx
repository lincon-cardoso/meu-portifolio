"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
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
                <Link href="/" className="nav-link active">
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
                <Link href="/contato" className="nav-link">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main>
        <section className="MeuPortifolio fade-in">
          <h1 className="MeuPortifolio-title">
            Desenvolvedor Web <span className="text-gradient">Fullsta</span>
          </h1>
          <p className="MeuPortifolio-description">
            Criando experiências digitais atraentes e funcionais com as
            tecnologias mais modernas do mercado.
          </p>
          <Link href="/contato" className="hire-me-button">
            Contrate-me
          </Link>
        </section>

        <section className="cards-de-projetos fade-in">
          <h2 className="projetos-title">Projetos em Destaque</h2>
          <div className="cards-container">
            <div className="card" data-category="frontend">
              <div className="card-image"></div>
              <h3 className="card-title">E-commerce Responsivo</h3>
              <p className="card-description">
                Site de vendas com design adaptável desenvolvido com React e
                Node.js
              </p>
            </div>
            <div className="card" data-category="backend">
              <div className="card-image"></div>
              <h3 className="card-title">API de Gestão</h3>
              <p className="card-description">
                Sistema backend para gerenciamento de recursos empresariais
              </p>
            </div>
            <div className="card" data-category="mobile">
              <div className="card-image"></div>
              <h3 className="card-title">App de Finanças</h3>
              <p className="card-description">
                Aplicativo móvel para controle financeiro pessoal
              </p>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: "4rem" }}>
            <Link href="/meuProjetos" className="btn btn-primary">
              Ver todos os projetos
            </Link>
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
            <a href="#" className="social-icon" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
            <a href="#" className="social-icon" aria-label="GitHub">
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
