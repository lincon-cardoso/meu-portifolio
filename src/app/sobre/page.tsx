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
                  Olá! Sou Lincon Cardoso,{" "}
                  <strong>desenvolvedor front-end</strong> apaixonado por criar{" "}
                  <strong>soluções digitais</strong> que façam sentido para as
                  pessoas. Acredito que cada linha de código pode carregar um{" "}
                  <strong>propósito</strong> — seja para facilitar a rotina de
                  alguém ou transformar uma ideia em algo{" "}
                  <strong>real e funcional</strong>.
                </p>
                <p className="sobre-mim-description">
                  Minha trajetória com programação começou há cerca de 5 anos,
                  quando descobri o poder de unir{" "}
                  <strong>criatividade com tecnologia</strong>. Desde então,
                  venho me especializando na criação de{" "}
                  <strong>interfaces modernas, acessíveis e seguras</strong>,
                  sempre com atenção aos detalhes que melhoram a{" "}
                  <strong>experiência do usuário</strong>.
                </p>
                <p className="sobre-mim-description">
                  Trabalho com tecnologias como{" "}
                  <strong>React, Next.js, TypeScript e Sass</strong>, buscando
                  desenvolver{" "}
                  <strong>
                    aplicações rápidas, responsivas e com código limpo
                  </strong>
                  . No dia a dia, utilizo ferramentas como{" "}
                  <strong>Git, ESLint e Jest</strong> para manter a qualidade do
                  projeto, além de contar com o apoio de soluções como{" "}
                  <strong>Cloudflare</strong> para performance e proteção.
                </p>
                <p className="sobre-mim-description">
                  Tenho <strong>experiência também no back-end</strong>,
                  utilizando <strong>Node.js, Prisma e PostgreSQL</strong> para
                  estruturar <strong>APIs seguras</strong>, com autenticação via{" "}
                  <strong>JWT</strong> e validação de dados com{" "}
                  <strong>Zod</strong>. Isso me permite colaborar melhor com{" "}
                  <strong>times fullstack</strong> e entender a aplicação de
                  ponta a ponta.
                </p>
                <p className="sobre-mim-description">
                  Mais do que programar, gosto de{" "}
                  <strong>resolver problemas com empatia e clareza</strong>.
                  Valorizo projetos que priorizam a{" "}
                  <strong>experiência do usuário</strong> e que entregam{" "}
                  <strong>valor de verdade</strong>.
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
                  <Link href="/contato" className="btn btn-primary">
                    Entre em contato
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
