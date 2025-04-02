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
                  Olá! Sou Lincon Cardoso, desenvolvedor web apaixonado por criar soluções digitais inovadoras.
                </p>
                <p className="sobre-mim-description">
                  Minha jornada na programação começou há 5 anos, quando descobri o quanto era fascinante transformar ideias em interfaces funcionais e intuitivas.
                </p>
                <p className="sobre-mim-description">
                  Atualmente, me especializo em desenvolvimento <strong>frontend</strong> e <strong>backend</strong>, com foco em aplicações modernas e escaláveis. Trabalho com tecnologias como <strong>React</strong>, <strong>Next.js</strong>, <strong>TypeScript</strong>, <strong>Sass</strong>, <strong>PostgreSQL</strong> e <strong>Node.js</strong>, buscando sempre manter meu código limpo e padronizado com ferramentas como <strong>ESLint</strong> e controle de versão com <strong>Git</strong>.
                </p>
                <p className="sobre-mim-description">
                  Tenho experiência na construção de interfaces responsivas, design centrado no usuário (<strong>UI/UX</strong>) e APIs <strong>RESTful</strong>, sempre com atenção à performance, acessibilidade e boas práticas.
                </p>
                <p className="sobre-mim-description">
                  Acredito que um bom código vai além de simplesmente funcionar — ele precisa oferecer uma experiência marcante para o usuário, com equilíbrio entre inovação técnica e usabilidade.
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
      <Rodape />
    </>
  );
}
