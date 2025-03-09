"use client";

import React from "react";
import useProjectFilter from "@/hooks/useProjectFilter";
import Cabecalho from "../../components/layout/Cabecalho";
import Rodape from "../../components/layout/Rodape";

export default function MeuProjetosPage() {
  useProjectFilter();

  return (
    <>
      {/* Cabeçalho */}
      <Cabecalho />
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
      <Rodape />
      {/* Rodapé */}
    </>
  );
}
