"use client";

import React from "react";
import useProjectFilter from "@/hooks/useProjectFilter";
import Cabecalho from "../../components/layout/Cabecalho";
import Rodape from "../../components/layout/Rodape";

// const menuItems = [
//   { category: "todos", label: "Todos" },
//   { category: "frontend", label: "Frontend" },
//   { category: "backend", label: "Backend" },
//   { category: "mobile", label: "Mobile" },
//   { category: "ui", label: "UI/UX" },
// ];

// const projectsData = [
//   { category: "frontend", title: "E-commerce Responsivo", date: "01/2023" },
//   { category: "backend", title: "API de Gestão", date: "03/2023" },
//   { category: "mobile", title: "App de Finanças", date: "05/2023" },
//   { category: "ui", title: "Design System", date: "07/2023" },
//   { category: "frontend", title: "Landing Page", date: "09/2023" },
//   { category: "backend", title: "Sistema de Autenticação", date: "10/2023" },
//   { category: "mobile", title: "App de Delivery", date: "11/2023" },
//   { category: "ui", title: "Redesign de Interface", date: "12/2023" },
//   { category: "frontend", title: "Blog Pessoal", date: "01/2024" },
//   { category: "backend", title: "API RESTful", date: "02/2024" },
//   { category: "mobile", title: "App de Notas", date: "03/2024" },
//   { category: "ui", title: "Dashboard de Analytics", date: "04/2024" },
// ];

export default function MeuProjetosPage() {
  useProjectFilter();

  return (
    <>
      <Cabecalho />
      <main className="fade-in">
        <section className="cards-de-projetos">
          <h2 className="projetos-title" id="projetos">
            Meus Projetos
          </h2>
          <h1 style={{ textAlign: "center" }}>
            Breve projetos que desenvolvi e participei, com foco em frontend, backend.
          </h1>


          {/* <div className="menu-horizontal">
            <ul className="menu-list">
              {menuItems.map((item) => (
                <li className="menu-item" key={item.category}>
                  <a
                    href="#"
                    data-category={item.category}
                    className={item.category === "todos" ? "active" : ""}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="cards-container">
            {projectsData.map((project, index) => (
              <div
                className="card"
                data-category={project.category}
                key={index}
              >
                <div className="card-image"></div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.date}</p>
              </div>
            ))}
          </div>

          */}

        </section>
      </main>
      <Rodape />
    </>
  );
}
