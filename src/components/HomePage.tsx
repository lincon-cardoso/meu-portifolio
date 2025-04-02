"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaReact, FaSass, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiPostgresql, SiEslint } from 'react-icons/si';

export default function HomePage() {
  return (
    <main>
      <section className="MeuPortifolio fade-in">
        <div className="MeuPortifolio-content">
          <a href="/img/Foto.jpg" target="_blank" rel="noopener noreferrer">
            <Image
              src="/img/Foto.jpg"
              alt="Minha foto de perfil"
              className="MeuPortifolio-foto"
              width={300}
              height={300}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              priority
            />
          </a>

          <div className="MeuPortifolio-text">
            <h1 className="MeuPortifolio-title">
              Desenvolvedor <span className="text-gradient">Web</span><br />
              Front-<span className="text-gradient">End</span>
            </h1>

            <p className="MeuPortifolio-description">
              <strong>Transformo ideias em interfaces únicas</strong>. Cada linha que escrevo tem um <strong>propósito claro</strong>, comunica uma <strong>identidade</strong> e gera <span className="destaque-impacto">impacto visual real</span>.
            </p>

            <h2 className="MeuPortifolio-tech">
              React · Next.js · UI/UX Design
            </h2>

            <div className="MeuPortifolio-buttons">
              <Link href="/contato" className="hire-me-button destaque-botao">
                🚀 Contrate-me agora
              </Link>
              <Link href="/meuProjetos" className="btn btn-secondary">
                🌟 Ver todos os projetos
              </Link>
            </div>

            {/* Stacks */}
            {/* Stacks com ícones */}
            <div className="MeuPortifolio-stacks">
              <FaReact title="React" className="icon" />
              <SiNextdotjs title="Next.js" className="icon" />
              <SiTypescript title="TypeScript" className="icon" />
              <FaSass title="Sass" className="icon" />
              <SiPostgresql title="PostgreSQL" className="icon" />
              <SiEslint title="ESLint" className="icon" />
              <FaGitAlt title="Git" className="icon" />
            </div>
          </div>
        </div>
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
