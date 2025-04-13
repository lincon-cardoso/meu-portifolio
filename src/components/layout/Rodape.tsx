"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

export default function Rodape() {
  return (
    <footer className="footer fade-in">
      <div className="footer-container">
        {/* Coluna 1: Navegação */}
        <div className="footer-column">
          <h3>Navegação</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/meuProjetos">Projetos</Link>
            </li>
            <li>
              <Link href="/sobre">Sobre Mim</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
            <li className="nav-item">
              <Link href="https://admin.devlincon.com.br" className="nav-link">
                Login
              </Link>
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
            <li>
              <a href="/curriculo.pdf" target="_blank">
                Currículo (PDF)
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
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Frase de Assinatura */}
      <div className="footer-signature">
        <p>
          &quot;Criando soluções digitais com identidade, propósito e impacto
          visual real.&quot;
        </p>
      </div>

      {/* Botão Voltar ao Topo */}
      <div className="footer-back-to-top">
        <button
          className="btn-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Voltar ao Topo
        </button>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>
          © 2025 Lincon Cardoso – Desenvolvedor Web. Todos os direitos
          reservados.
          <br />
          <a href="/politica-de-privacidade">Política de Privacidade</a> |{" "}
          <a href="/termos-de-uso">Termos de Uso</a>
        </p>
      </div>
    </footer>
  );
}
