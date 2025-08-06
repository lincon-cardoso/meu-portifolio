"use client";

import React from "react";
import Link from "next/link";
import Cabecalho from "../../components/layout/Cabecalho";
import Rodape from "../../components/layout/Rodape";

// Estrutura de dados para as habilidades
const skillsData = [
  {
    category: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "Sass",
      "Responsive Design",
      "UI/UX",
      "TypeScript",
      "React",
      "Next.js",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "RESTful API",
      "Prisma",
      "PostgreSQL",
      "JWT (Autenticação)",
      "Zod (Validação)",
    ],
  },
  {
    category: "Dev Tools",
    skills: ["Git & GitHub", "ESLint", "Jest", "Cloudflare"],
  },
];

export default function SobrePage() {
  return (
    <>
      {/* Cabeçalho */}
      <Cabecalho />

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
                  👋 Oi, sou o Lincon Cardoso,{" "}
                  <strong>desenvolvedor front-end</strong> com 5 anos de
                  experiência criando{" "}
                  <strong>interfaces modernas, acessíveis</strong> e com foco em{" "}
                  <strong>performance e usabilidade</strong>.
                </p>
                <p className="sobre-mim-description">
                  Gosto de transformar ideias em{" "}
                  <strong>interfaces claras e intuitivas</strong>, sempre com
                  atenção à <strong>experiência do usuário</strong>. Utilizo{" "}
                  <strong>React, Next.js e TypeScript</strong> para construir
                  aplicações robustas e escaláveis, mantendo um código limpo e
                  organizado com o suporte de ferramentas como{" "}
                  <strong>ESLint, Prettier e Jest</strong>.
                </p>
                <p className="sobre-mim-description">
                  Tenho experiência com <strong>estilização em SCSS</strong>,
                  componentização, responsividade e{" "}
                  <strong>acessibilidade (WCAG)</strong>. No dia a dia, colaboro
                  com designers utilizando o <strong>Figma</strong> para
                  entender os layouts, extrair medidas, cores e garantir
                  fidelidade visual na implementação — sem atuar diretamente na
                  criação do design.
                </p>
                <p className="sobre-mim-description">
                  Além disso, também tenho conhecimento em{" "}
                  <strong>Node.js, Prisma e PostgreSQL</strong>, o que me
                  permite ter uma visão mais completa da aplicação e contribuir
                  melhor em <strong>times full-stack</strong>.
                </p>
                <p className="sobre-mim-description">
                  Se você procura um desenvolvedor comprometido com a{" "}
                  <strong>qualidade da interface</strong>, boa{" "}
                  <strong>experiência do usuário</strong> e foco em{" "}
                  <strong>entregar valor real ao projeto</strong>, estou à
                  disposição pra conversar.
                </p>

                {/* Seção de habilidades */}
                <div className="skills-container">
                  <h3>Minhas habilidades</h3>
                  <div className="skills-grid">
                    {skillsData.map((group) => (
                      <div key={group.category} className="skills-column">
                        <h4>{group.category}</h4>
                        <ul className="skills-list">
                          {group.skills.map((skill) => (
                            <li key={skill} className="skill-item">
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="cta-container">
                  <p className="cta-text">
                    Gostou do que viu? Vamos construir algo incrível juntos.
                  </p>
                  <Link href="/contato" className="hire-me-button">
                    Vamos conversar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <Rodape />
    </>
  );
}
