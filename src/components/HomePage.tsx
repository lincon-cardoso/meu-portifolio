"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="MeuPortifolio fade-in">
        <h1 className="MeuPortifolio-title">
          Desenvolvedor Web <span className="text-gradient">Fullstack</span>
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
  );
}
