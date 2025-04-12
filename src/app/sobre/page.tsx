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
                  Olá! Sou Lincon Cardoso, desenvolvedor web apaixonado por criar soluções digitais com propósito, segurança e impacto real.
                </p>
                <p className="sobre-mim-description">
                  Minha jornada na programação começou há cerca de 5 anos, quando percebi o poder de transformar ideias em experiências interativas e funcionais. Desde então, venho me especializando em desenvolvimento <strong>fullstack</strong>, com foco em boas práticas, performance e segurança digital.
                </p>
                <p className="sobre-mim-description">
                  Trabalho com tecnologias modernas como <strong>React</strong>, <strong>Next.js</strong>, <strong>TypeScript</strong>, <strong>Sass</strong>, <strong>PostgreSQL</strong> e <strong>Node.js</strong>, buscando sempre manter um código limpo, escalável e padronizado. Uso ferramentas como <strong>Git</strong>, <strong>ESLint</strong> e <strong>Cloudflare</strong> para garantir qualidade e proteção no desenvolvimento de aplicações.
                </p>
                <p className="sobre-mim-description">
                  Gosto de pensar além do código: criar soluções que realmente façam sentido para quem usa, com <strong>experiências intuitivas, acessíveis e seguras</strong>. Acredito que um bom projeto une técnica e propósito — e é nisso que coloco meu foco todos os dias.
                </p>


                {/* Seção de habilidades */}
                <div className="skills-container">
                  <h3>Minhas habilidades</h3>
                  <div className="skills-grid">
                    {/* Frontend */}
                    <div className="skills-column">
                      <h4>Frontend</h4>
                      <div className="skill-item">HTML5</div>
                      <div className="skill-item">CSS3</div>
                      <div className="skill-item">Sass</div>
                      <div className="skill-item">Responsive Design</div>
                      <div className="skill-item">UI/UX</div>
                      <div className="skill-item">TypeScript</div>
                      <div className="skill-item">Next.js</div>
                    </div>

                    {/* Backend */}
                    <div className="skills-column">
                      <h4>Backend</h4>
                      <div className="skill-item">Node.js</div>
                      <div className="skill-item">RESTful API</div>
                      <div className="skill-item">PostgreSQL</div>
                      <div className="skill-item">MongoDB</div>
                    </div>

                    {/* Dev Tools */}
                    <div className="skills-column">
                      <h4>Dev Tools</h4>
                      <div className="skill-item">Git & GitHub</div>
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
