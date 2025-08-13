"use client";

import React, { useMemo, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import "@/style/pages/projects/projetos-loader.scss";
import "@/style/pages/projects/projetos-cards.scss"; // mesmo modelo de card da home
import "@/style/ui-components/menu/menu-filtro-projetos.scss"; // estilos do menu
import Cabecalho from "../../components/layout/Cabecalho";
import Rodape from "../../components/layout/Rodape";
import { Projeto } from "@/types/Projeto";
import { menuItems as baseMenuItems } from "@/utils/menuItems";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Erro ao buscar projetos");
    return res.json();
  });

// Adiciona a opção 'todos' dinamicamente para não duplicar no util compartilhado
const menuItems = [{ category: "todos", label: "Todos" }, ...baseMenuItems];

export default function MeuprojetosPage() {
  // SWR gerencia cache e estados de loading/erro, evitando múltiplos estados locais
  const { data: projects, error } = useSWR<Projeto[]>(
    "/api/projetos?all=true",
    fetcher
  );
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const handleFilterClick = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProjects = useMemo(
    () =>
      selectedCategory === "todos"
        ? projects || []
        : (projects || []).filter(
            (project) => project.category === selectedCategory
          ),
    [projects, selectedCategory]
  );

  return (
    <>
      <Cabecalho />
      <main className="fade-in">
        <section className="cards-de-projetos" style={{ textAlign: "center" }}>
          <h2 className="projetos-title" id="projetos">
            Meus Projetos
          </h2>
          <div className="menu-horizontal">
            <ul className="menu-list">
              {menuItems.map((item) => (
                <li className="menu-item" key={item.category}>
                  <button
                    type="button"
                    data-category={item.category}
                    className={
                      item.category === selectedCategory ? "active" : ""
                    }
                    onClick={() => handleFilterClick(item.category)}
                    aria-pressed={item.category === selectedCategory}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {!projects && !error ? (
            <div className="projetos-loader-container">
              <div
                className="loader-spinner projetos-loader-spinner"
                role="status"
                aria-label="Carregando projetos"
              />
              <span className="projetos-loader-text" aria-live="polite">
                Carregando projetos...
              </span>
            </div>
          ) : error ? (
            <div className="projetos-loader-container">
              <span
                className="projetos-loader-text"
                aria-live="polite"
                style={{ color: "red" }}
              >
                {error.message || "Erro ao buscar projetos"}
              </span>
            </div>
          ) : (
            <div className="cards-container">
              {filteredProjects.length === 0 ? (
                <p>Nenhum projeto encontrado.</p>
              ) : (
                filteredProjects.map((project) => (
                  <Link
                    href={`/projetos/${slugify(project.titulo || "")}`}
                    className="card"
                    data-category={project.category}
                    key={project.id}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="card-image" />
                    <h3 className="card-title">{project.titulo}</h3>
                    <p className="card-description">{project.descricao}</p>
                  </Link>
                ))
              )}
            </div>
          )}
        </section>
      </main>
      <Rodape />
    </>
  );
}
