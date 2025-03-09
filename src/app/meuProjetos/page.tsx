"use client";

import React from "react";
import Link from "next/link";
import useProjectFilter from "@/hooks/useProjectFilter";

export default function MeuProjetosPage() {
  useProjectFilter();

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
                <Link href="/meuProjetos" className="nav-link active">
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
      <main className="fade-in">
        <section className="cards-de-projetos">
          <h2 className="projetos-title" id="projetos">
            Meus Projetos
          </h2>
          <div className="menu-horizontal">
            <ul className="menu-list">
              <li className="menu-item">
                <a href="#" data-category="todos" className="active">
                  Todos
                </a>
              </li>
              <li className="menu-item">
                <a href="#" data-category="frontend">
                  Frontend
                </a>
              </li>
              <li className="menu-item">
                <a href="#" data-category="backend">
                  Backend
                </a>
              </li>
              <li className="menu-item">
                <a href="#" data-category="mobile">
                  Mobile
                </a>
              </li>
              <li className="menu-item">
                <a href="#" data-category="ui">
                  UI/UX
                </a>
              </li>
            </ul>
          </div>
          <div className="cards-container">
            {/* Card do Projeto 1 */}
            <div className="card" data-category="frontend">
              <div className="card-image"></div>
              <h3 className="card-title">E-commerce Responsivo</h3>
              <p className="card-description">01/2023</p>
            </div>
            {/* Card do Projeto 2 */}
            <div className="card" data-category="backend">
              <div className="card-image"></div>
              <h3 className="card-title">API de Gestão</h3>
              <p className="card-description">03/2023</p>
            </div>
            {/* Card do Projeto 3 */}
            <div className="card" data-category="mobile">
              <div className="card-image"></div>
              <h3 className="card-title">App de Finanças</h3>
              <p className="card-description">05/2023</p>
            </div>
            {/* Card do Projeto 4 */}
            <div className="card" data-category="ui">
              <div className="card-image"></div>
              <h3 className="card-title">Design System</h3>
              <p className="card-description">07/2023</p>
            </div>
            {/* Card do Projeto 5 */}
            <div className="card" data-category="frontend">
              <div className="card-image"></div>
              <h3 className="card-title">Landing Page</h3>
              <p className="card-description">09/2023</p>
            </div>
            {/* Card do Projeto 6 */}
            <div className="card" data-category="backend">
              <div className="card-image"></div>
              <h3 className="card-title">Sistema de Autenticação</h3>
              <p className="card-description">10/2023</p>
            </div>
            {/* Card do Projeto 7 */}
            <div className="card" data-category="mobile">
              <div className="card-image"></div>
              <h3 className="card-title">App de Delivery</h3>
              <p className="card-description">11/2023</p>
            </div>
            {/* Card do Projeto 8 */}
            <div className="card" data-category="ui">
              <div className="card-image"></div>
              <h3 className="card-title">Redesign de Interface</h3>
              <p className="card-description">12/2023</p>
            </div>
            {/* Card do Projeto 9 */}
            <div className="card" data-category="frontend">
              <div className="card-image"></div>
              <h3 className="card-title">Blog Pessoal</h3>
              <p className="card-description">01/2024</p>
            </div>
            {/* Card do Projeto 10 */}
            <div className="card" data-category="backend">
              <div className="card-image"></div>
              <h3 className="card-title">API RESTful</h3>
              <p className="card-description">02/2024</p>
            </div>
            {/* Card do Projeto 11 */}
            <div className="card" data-category="mobile">
              <div className="card-image"></div>
              <h3 className="card-title">App de Notas</h3>
              <p className="card-description">03/2024</p>
            </div>
            {/* Card do Projeto 12 */}
            <div className="card" data-category="ui">
              <div className="card-image"></div>
              <h3 className="card-title">Dashboard de Analytics</h3>
              <p className="card-description">04/2024</p>
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
