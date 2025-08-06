"use client";

import React, { useEffect, useState } from "react";
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

export default function MeuProjetosPage() {
  const [projects, setProjects] = useState<Projeto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  useProjectFilter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projetos?all=true"); // Busca todos os projetos
        if (!response.ok) {
          throw new Error("Erro ao buscar projetos");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
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
          <div className="cards-container">
            {filteredProjects.map((project) => (
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
            ))}
          </div>
        </section>
      </main>
      <Rodape />
    </>
  );
}
