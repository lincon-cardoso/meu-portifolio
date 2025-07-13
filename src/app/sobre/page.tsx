"use client";

import React from "react";
import Link from "next/link";
import Cabecalho from "../../components/layout/Cabecalho";
import Rodape from "../../components/layout/Rodape";

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
                  Olá! Sou Lincon Cardoso, desenvolvedor web apaixonado por
                  criar soluções digitais com propósito, segurança e impacto
                  real.
                </p>
                <p className="sobre-mim-description">
                  Minha jornada na programação começou há cerca de 5 anos,
                  quando percebi o poder de transformar ideias em experiências
                  interativas e funcionais. Desde então, venho me especializando
                  em desenvolvimento <strong>fullstack</strong>, com foco em
                  boas práticas, performance e segurança digital.
                </p>
                <p className="sobre-mim-description">
                  Trabalho com tecnologias modernas como <strong>React</strong>,{" "}
                  <strong>Next.js</strong>, <strong>TypeScript</strong>,{" "}
                  <strong>Sass</strong>, <strong>PostgreSQL</strong> e{" "}
                  <strong>Node.js</strong>, buscando sempre manter um código
                  limpo, escalável e padronizado. Uso ferramentas como{" "}
                  <strong>Git</strong>, <strong>ESLint</strong> e{" "}
                  <strong>Cloudflare</strong> para garantir qualidade e proteção
                  no desenvolvimento de aplicações.
                </p>
                <p className="sobre-mim-description">
                  Gosto de pensar além do código: criar soluções que realmente
                  façam sentido para quem usa, com{" "}
                  <strong>experiências intuitivas, acessíveis e seguras</strong>
                  . Acredito que um bom projeto une técnica e propósito — e é
                  nisso que coloco meu foco todos os dias.
                </p>

                {/* Seção de stacks */}
                <div className="skills-container">
                  <h3>Minhas Stacks</h3>
                  <div className="skills-grid">
                    {/* Frontend */}
                    <div className="skills-column">
                      <h4>🧩 Frontend</h4>
                      <div className="skill-item">
                        <strong>React:</strong> Biblioteca principal de UI
                      </div>
                      <div className="skill-item">
                        <strong>Next.js:</strong> Framework fullstack com App
                        Router
                      </div>
                      <div className="skill-item">
                        <strong>TypeScript:</strong> Superset do JavaScript
                        tipado
                      </div>
                      <div className="skill-item">
                        <strong>Sass / SCSS:</strong> Pré-processador CSS para
                        estilização avançada
                      </div>
                    </div>

                    {/* Backend e Infraestrutura */}
                    <div className="skills-column">
                      <h4>🗄️ Backend e Infraestrutura</h4>
                      <div className="skill-item">
                        <strong>Node.js:</strong> Ambiente de execução (base do
                        Next.js)
                      </div>
                      <div className="skill-item">
                        <strong>Prisma:</strong> ORM moderno e tipado para
                        PostgreSQL
                      </div>
                      <div className="skill-item">
                        <strong>PostgreSQL:</strong> Banco de dados relacional
                        robusto
                      </div>
                    </div>

                    {/* Autenticação e Segurança */}
                    <div className="skills-column">
                      <h4>🔐 Autenticação e Segurança</h4>
                      <div className="skill-item">
                        <strong>JWT:</strong> Autenticação baseada em tokens
                      </div>
                      <div className="skill-item">
                        <strong>Argon2:</strong> Algoritmo de hashing de senha
                        seguro
                      </div>
                      <div className="skill-item">
                        <strong>CryptoJS:</strong> Criptografia de dados
                        sensíveis
                      </div>
                    </div>

                    {/* Validação */}
                    <div className="skills-column">
                      <h4>✅ Validação</h4>
                      <div className="skill-item">
                        <strong>Zod:</strong> Validação de schema moderna e
                        funcional
                      </div>
                      <div className="skill-item">
                        <strong>Joi:</strong> Alternativa mais clássica para
                        validação de dados
                      </div>
                    </div>

                    {/* Qualidade de Código e Testes */}
                    <div className="skills-column">
                      <h4>🧪 Qualidade de Código e Testes</h4>
                      <div className="skill-item">
                        <strong>ESLint:</strong> Linter de código para manter
                        padrões e evitar erros
                      </div>
                      <div className="skill-item">
                        <strong>Jest:</strong> Framework de testes unitários e
                        integração
                      </div>
                    </div>

                    {/* DevOps / Automação */}
                    <div className="skills-column">
                      <h4>⚙️ DevOps / Automação</h4>
                      <div className="skill-item">
                        <strong>Git:</strong> Controle de versão
                      </div>
                      <div className="skill-item">
                        <strong>GitHub Actions:</strong> Automação de CI/CD para
                        deploy, lint, test etc
                      </div>
                    </div>
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
      <Rodape />
    </>
  );
}
