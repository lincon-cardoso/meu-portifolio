"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiPrisma,
  SiJsonwebtokens,
  SiZod,
} from "react-icons/si";
import { Projetos } from "./Projetos";

export default function HomePage() {
  return (
    <main>
      <section className="MeuPortifolio fade-in">
        <div className="MeuPortifolio-content">
          <Image
            src="/img/Foto.jpg"
            alt="Minha foto de perfil"
            className="MeuPortifolio-foto"
            width={300}
            height={300}
            priority
          />

          <div className="MeuPortifolio-text">
            <h1 className="MeuPortifolio-title">
              Desenvolvedor <span className="text-gradient">Web</span>
              <br />
              Front-<span className="text-gradient">End</span>
            </h1>

            <p className="MeuPortifolio-description">
              <strong>Transformo ideias em interfaces únicas</strong>. Cada
              linha que escrevo tem um <strong>propósito claro</strong>,
              comunica uma <strong>identidade</strong> e gera{" "}
              <span className="destaque-impacto">impacto visual real</span>.
            </p>

            <h2 className="MeuPortifolio-tech">
              React · Next.js · Front-end Moderno e Acessível
            </h2>

            <div className="MeuPortifolio-buttons">
              <Link
                href="/contato"
                className="hire-me-button destaque-botao"
                aria-label="Contrate-me agora"
              >
                🚀 Contrate-me agora
              </Link>
              <Link
                href="/meuProjetos"
                className="btn btn-secondary"
                aria-label="Ver todos os projetos"
              >
                🌟 Ver todos os projetos
              </Link>
            </div>

            <div className="MeuPortifolio-stacks">
              <div className="stack-item">
                <FaReact title="React" className="icon" />
                <span className="stack-name">React</span>
              </div>
              <div className="stack-item">
                <SiNextdotjs title="Next.js" className="icon" />
                <span className="stack-name">Next.js</span>
              </div>
              <div className="stack-item">
                <SiTypescript title="TypeScript" className="icon" />
                <span className="stack-name">TypeScript</span>
              </div>
              <div className="stack-item">
                <SiPrisma title="Prisma" className="icon" />
                <span className="stack-name">Prisma</span>
              </div>
              <div className="stack-item">
                <SiPostgresql title="PostgreSQL" className="icon" />
                <span className="stack-name">PostgreSQL</span>
              </div>
              <div className="stack-item">
                <SiJsonwebtokens title="JWT" className="icon" />
                <span className="stack-name">JWT</span>
              </div>
              <div className="stack-item">
                <SiZod title="Zod" className="icon" />
                <span className="stack-name">Zod</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cards-de-projetos fade-in">
        <h2 className="projetos-title">Projetos em Destaque</h2>
        <div className="cards-container">
          <Projetos />
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
