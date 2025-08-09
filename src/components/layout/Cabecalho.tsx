"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Cabecalho() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="header fade-in">
      <div className="container">
        <div className="header-container">
          {/* teste */}
          <div className="header-profile">
            <Link href="/" className="profile-name">
              {/* teste */}
              Meu Portfólio Pessoal
            </Link>
            <button
              className={`mobile-menu-toggle ${menuOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <nav className={`header-nav ${menuOpen ? "active" : ""}`}>
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
                  href="/meuprojetos"
                  className={`nav-link ${
                    pathname === "/meuprojetos" ? "active" : ""
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
              <li className="nav-item">
                <Link href="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
