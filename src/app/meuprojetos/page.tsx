"use client";

import React, { useEffect, useState } from "react";
import "@/style/pages/projects/projetos-loader.scss";
import useProjectFilter from "@/hooks/useProjectFilter";
import Cabecalho from "../../components/layout/Cabecalho";
import Rodape from "../../components/layout/Rodape";
import { Projeto } from "@/types/Projeto";

const menuItems = [
  { category: "todos", label: "Todos" },
  { category: "financeiro", label: "Financeiro" },
  { category: "comercial", label: "Comercial" },
  { category: "dashboard-admin", label: "Dashboard/Admin" },
  { category: "landing-page", label: "Landing Page" },
  { category: "blog", label: "Blog" },
  { category: "educacao", label: "Educação" },
  { category: "delivery", label: "Delivery" },
  { category: "pessoal", label: "Pessoal" },
];

export default function MeuprojetosPage() {
  const [projects, setProjects] = useState<Projeto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useProjectFilter();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/projetos?all=true");
        if (!response.ok) {
          throw new Error("Erro ao buscar projetos");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro ao buscar projetos");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleFilterClick = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProjects =
    selectedCategory === "todos"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <>
      <Cabecalho />
      <main className="fade-in">
        <section className="cards-de-projetos">
          <h2 className="projetos-title" id="projetos">
            Meus Projetos
          </h2>
          <div className="menu-horizontal">
            <ul className="menu-list">
              {menuItems.map((item) => (
                <li className="menu-item" key={item.category}>
                  <a
                    href="#"
                    data-category={item.category}
                    className={
                      item.category === selectedCategory ? "active" : ""
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      handleFilterClick(item.category);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {loading ? (
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
                {error}
              </span>
            </div>
          ) : (
            <div className="cards-container">
              {filteredProjects.length === 0 ? (
                <p>Nenhum projeto encontrado.</p>
              ) : (
                filteredProjects.map((project) => (
                  <div
                    className="card"
                    data-category={project.category}
                    key={project.id}
                  >
                    <div className="card-image">
                      {/* {project.imagem && (
                        <img
                          src={project.imagem}
                          alt={`Imagem do projeto ${project.titulo}`}
                        />
                      )} */}
                    </div>
                    <h3 className="card-title">{project.titulo}</h3>
                    <p className="card-description">{project.descricao}</p>
                  </div>
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
