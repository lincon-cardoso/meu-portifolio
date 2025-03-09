"use client";

import React from "react";
import Link from "next/link";

export default function SobrePage() {
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
                <Link href="/sobre" className="nav-link active">
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
      <main className="fade-in">
        <section className="sobre-mim">
          <h2 className="sobre-mim-title">Sobre Mim</h2>
          <div className="container">
            <div className="sobre-mim-content">
              {/* Imagem de perfil ampliada */}
              <div className="sobre-mim-image">
                <div className="profile-photo-large"></div>
              </div>
              {/* Texto descritivo */}
              <div className="sobre-mim-text">
                <p className="sobre-mim-description">
                  Olá! Sou Lincon Cardoso, um desenvolvedor web apaixonado por
                  criar soluções digitais inovadoras. Minha jornada com
                  programação começou há 5 anos quando descobri a fascinante
                  possibilidade de transformar ideias em interfaces funcionais.
                </p>
                <p className="sobre-mim-description">
                  Especializo-me em desenvolvimento <strong>frontend</strong> e{" "}
                  <strong>backend</strong>, utilizando tecnologias como{" "}
                  <strong>HTML5</strong>, <strong>CSS3</strong>,{" "}
                  <strong>JavaScript</strong>,<strong>React</strong>,{" "}
                  <strong>Node.js</strong> e <strong>MongoDB</strong>. Tenho
                  experiência com sites responsivos, aplicações web e
                  desenvolvimento de APIs.
                </p>
                <p className="sobre-mim-description">
                  Meu objetivo é criar experiências digitais que não apenas
                  pareçam excelentes, mas também ofereçam alto desempenho e
                  usabilidade. Acredito que um bom código é aquele que equilibra
                  inovação técnica com experiência do usuário.
                </p>

                {/* Seção de habilidades */}
                <div className="skills-container">
                  <h3>Minhas habilidades</h3>
                  <div className="skills-grid">
                    <div className="skill-item">HTML5</div>
                    <div className="skill-item">CSS3</div>
                    <div className="skill-item">JavaScript</div>
                    <div className="skill-item">React</div>
                    <div className="skill-item">Node.js</div>
                    <div className="skill-item">MongoDB</div>
                    <div className="skill-item">Git</div>
                    <div className="skill-item">UI/UX</div>
                    <div className="skill-item">Responsive Design</div>
                    <div className="skill-item">RESTful API</div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="cta-container">
                  <Link href="/contato" className="btn btn-primary">
                    Entre em contato
                  </Link>
                  <a href="#" className="btn btn-outline">
                    Baixar currículo
                  </a>
                </div>
              </div>
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
