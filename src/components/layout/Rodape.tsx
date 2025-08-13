"use client";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Rodape() {
  return (
    <footer className="footer fade-in">
      <div className="container">
        <div className="footer-container">
          {/* Coluna 1: Navegação */}
          <div className="footer-column">
            <h3>Navegação</h3>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/meuprojetos">Projetos</Link>
              </li>
              <li>
                <Link href="/sobre">Sobre Mim</Link>
              </li>
              <li>
                <Link href="/contato">Contato</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 2: Contato */}
          <div className="footer-column">
            <h3>Contato</h3>
            <ul>
              <li>
                <a href="mailto:contato@devlincon.com.br">
                  contato@devlincon.com.br
                </a>
              </li>
              <li>Santa Catarina, Brasil</li>
            </ul>
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div className="footer-column">
            <div className="footer-social-header">
              <h3>Redes Sociais</h3>
            </div>
            <div className="footer-social">
              <a
                href="https://www.linkedin.com/in/lincon-cardoso/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/lincon-cardoso"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
        {/* Direitos Autorais e Links de Privacidade */}
        <div className="footer-bottom">
          <div className="footer-signature">
            <p>
              &quot;Criando soluções digitais com identidade, propósito e
              impacto visual real.&quot;
            </p>
          </div>

          <div className="footer-back-to-top">
            <button
              className="btn-back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Voltar ao Topo
            </button>
          </div>

          <div className="footer-copyright">
            <p>
              © 2025 Lincon Cardoso – Desenvolvedor Web. Todos os direitos
              reservados.
            </p>
          </div>

          <div className="footer-links">
            <Link href="/termos-de-uso">Termos de Uso</Link>
            <Link href="/politica-de-privacidade">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
