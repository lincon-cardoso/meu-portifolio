"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Cabecalho() {
  const pathname = usePathname();

  return (
    <header className="header fade-in">
      <div className="header-container">
        <div className="header-profile">
          <div className="profile-photo"></div>
          <Link href="/" className="profile-name">
            Meu Portfólio Pessoal
          </Link>
        </div>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/meuProjetos"
                className={`nav-link ${
                  pathname === "/meuProjetos" ? "active" : ""
                }`}
              >
                Meus Projetos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/sobre"
                className={`nav-link ${pathname === "/sobre" ? "active" : ""}`}
              >
                Sobre Mim
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contato"
                className={`nav-link ${
                  pathname === "/contato" ? "active" : ""
                }`}
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
