"use client";

import { useState } from "react";
import Modal from "react-modal";
import styles from "./dashboard.module.scss";

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
interface Projeto {
  id: string;
  nome?: string;
  titulo?: string;
  name?: string;
  descricao?: string;
  imagem?: string;
  category?: string;
  tecnologias?: string[];
  link?: string;
  linkGithub?: string;
  destaque?: boolean;
}

export default function ProjectList({ projetos }: { projetos: Projeto[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null);
  const [editData, setEditData] = useState<Partial<Projeto>>({});
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewProjeto, setViewProjeto] = useState<Projeto | null>(null);
  const handleView = (projeto: Projeto) => {
    setViewProjeto(projeto);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setViewProjeto(null);
  };
  const [projetosState, setProjetosState] = useState<Projeto[]>(projetos);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja apagar este projeto?")) return;
    try {
      const res = await fetch(`/api/projetos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao apagar");
      setProjetosState((prev) => prev.filter((p) => p.id !== id));
      setSuccessMsg("Projeto apagado com sucesso!");
      setTimeout(() => setSuccessMsg(""), 1500);
    } catch {
      setErrorMsg("Erro ao apagar projeto!");
      setTimeout(() => setErrorMsg(""), 2000);
    }
  };

  if (typeof window !== "undefined") {
    Modal.setAppElement("body");
  }

  const handleEdit = (projeto: Projeto) => {
    setSelectedProjeto(projeto);
    setEditData({ ...projeto });
    setModalOpen(true);
    setSuccessMsg("");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProjeto(null);
    setEditData({});
    setSuccessMsg("");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeArray = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value.split(",").map((t) => t.trim()),
    }));
  };

  const handleSave = async () => {
    if (!selectedProjeto) return;
    try {
      const res = await fetch(`/api/projetos/${selectedProjeto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error("Erro ao salvar");
      const updatedProjeto = await res.json();
      setProjetosState((prev) =>
        prev.map((p) => (p.id === updatedProjeto.id ? updatedProjeto : p))
      );
      // Se o modal de visualização estiver aberto para o mesmo projeto, atualize também
      setViewProjeto((prev) =>
        prev && prev.id === updatedProjeto.id ? updatedProjeto : prev
      );
      setSuccessMsg("Cadastrado com sucesso!");
      setTimeout(() => {
        closeModal();
      }, 1200);
    } catch {
      alert("Erro ao salvar alterações!");
    }
  };

  return (
    <>
      {successMsg && (
        <div className={styles["dashboard__success-toast"]}>{successMsg}</div>
      )}
      {errorMsg && (
        <div className={styles["dashboard__error-toast"]}>{errorMsg}</div>
      )}
      <ul className={styles["dashboard__projects-list"]}>
        {projetosState.length === 0 && (
          <li className={styles["dashboard__no-projects"]}>
            Nenhum projeto encontrado.
          </li>
        )}
        {projetosState.map((projeto: Projeto) => (
          <li key={projeto.id} className={styles["dashboard__project-item"]}>
            <span className={styles["dashboard__project-name"]}>
              {projeto.nome || projeto.titulo || projeto.name}
            </span>
            <button
              className={styles["dashboard__btn-editar"]}
              onClick={() => handleEdit(projeto)}
            >
              Editar
            </button>
            <button
              className={styles["dashboard__btn-visualizar"]}
              onClick={() => handleView(projeto)}
            >
              Visualizar
            </button>
            {/* Modal de Visualização (idêntico ao de edição, mas read-only) */}
            <Modal
              isOpen={viewModalOpen}
              onRequestClose={closeViewModal}
              contentLabel="Visualizar Projeto"
              className={styles["dashboard__modal"]}
              overlayClassName={styles["dashboard__modal-overlay"]}
            >
              {viewProjeto && (
                <>
                  <h3>Visualizar Projeto</h3>
                  <form className={styles["dashboard__modal-form"]}>
                    <label className={styles["dashboard__modal-label"]}>
                      <b>Título:</b>
                      <input
                        type="text"
                        value={
                          viewProjeto.titulo ||
                          viewProjeto.nome ||
                          viewProjeto.name ||
                          ""
                        }
                        className={styles["dashboard__modal-input"]}
                        disabled
                        readOnly
                      />
                    </label>
                    <label className={styles["dashboard__modal-label"]}>
                      <b>Descrição:</b>
                      <textarea
                        value={viewProjeto.descricao || ""}
                        className={styles["dashboard__modal-textarea"]}
                        rows={3}
                        disabled
                        readOnly
                      />
                    </label>
                    <label className={styles["dashboard__modal-label"]}>
                      <b>Imagem (URL):</b>
                      <input
                        type="text"
                        value={viewProjeto.imagem || ""}
                        className={styles["dashboard__modal-input"]}
                        disabled
                        readOnly
                      />
                      {viewProjeto.imagem && (
                        <a
                          href={viewProjeto.imagem}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: 8 }}
                        >
                          Ver imagem
                        </a>
                      )}
                    </label>
                    <label className={styles["dashboard__modal-label"]}>
                      <b>Categoria:</b>
                      <select
                        value={viewProjeto.category || ""}
                        className={styles["dashboard__modal-input"]}
                        disabled
                      >
                        <option value="" disabled>
                          Selecione uma categoria
                        </option>
                        {menuItems
                          .filter((item) => item.category !== "todos")
                          .map((item) => (
                            <option key={item.category} value={item.category}>
                              {item.label}
                            </option>
                          ))}
                      </select>
                    </label>
                    <label className={styles["dashboard__modal-label"]}>
                      <b>Tecnologias (separadas por vírgula):</b>
                      <input
                        type="text"
                        value={
                          Array.isArray(viewProjeto.tecnologias)
                            ? viewProjeto.tecnologias.join(", ")
                            : ""
                        }
                        className={styles["dashboard__modal-input"]}
                        disabled
                        readOnly
                      />
                    </label>
                    <label className={styles["dashboard__modal-label"]}>
                      <b>Link:</b>
                      <input
                        type="text"
                        value={viewProjeto.link || ""}
                        className={styles["dashboard__modal-input"]}
                        disabled
                        readOnly
                      />
                      {viewProjeto.link && (
                        <a
                          href={viewProjeto.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: 8 }}
                        >
                          Abrir
                        </a>
                      )}
                    </label>
                    <label className={styles["dashboard__modal-label"]}>
                      <b>Link Github:</b>
                      <input
                        type="text"
                        value={viewProjeto.linkGithub || ""}
                        className={styles["dashboard__modal-input"]}
                        disabled
                        readOnly
                      />
                      {viewProjeto.linkGithub && (
                        <a
                          href={viewProjeto.linkGithub}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginLeft: 8 }}
                        >
                          Abrir
                        </a>
                      )}
                    </label>
                    <label
                      className={styles["dashboard__modal-label"]}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <b>Destaque:</b>
                      <input
                        type="checkbox"
                        checked={!!viewProjeto.destaque}
                        disabled
                        readOnly
                        style={{ marginLeft: 8 }}
                      />
                    </label>
                    <div className={styles["dashboard__modal-actions"]}>
                      <button
                        type="button"
                        onClick={closeViewModal}
                        className={styles["dashboard__modal-cancel"]}
                      >
                        Fechar
                      </button>
                    </div>
                  </form>
                </>
              )}
            </Modal>
            <button
              className={styles["dashboard__btn-apagar"]}
              onClick={() => handleDelete(projeto.id)}
              style={{ marginLeft: 8 }}
            >
              Apagar
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Projeto"
        className={styles["dashboard__modal"]}
        overlayClassName={styles["dashboard__modal-overlay"]}
      >
        {selectedProjeto && (
          <>
            <h3>Editar Projeto</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className={styles["dashboard__modal-form"]}
            >
              <label className={styles["dashboard__modal-label"]}>
                <b>Título:</b>
                <input
                  type="text"
                  name="titulo"
                  value={editData.titulo || ""}
                  onChange={handleChange}
                  className={styles["dashboard__modal-input"]}
                  required
                />
              </label>
              <label className={styles["dashboard__modal-label"]}>
                <b>Descrição:</b>
                <textarea
                  name="descricao"
                  value={editData.descricao || ""}
                  onChange={handleChange}
                  className={styles["dashboard__modal-textarea"]}
                  rows={3}
                  required
                />
              </label>
              <label className={styles["dashboard__modal-label"]}>
                <b>Imagem (URL):</b>
                <input
                  type="text"
                  name="imagem"
                  value={editData.imagem || ""}
                  onChange={handleChange}
                  className={styles["dashboard__modal-input"]}
                />
              </label>
              <label className={styles["dashboard__modal-label"]}>
                <b>Categoria:</b>
                <select
                  name="category"
                  value={editData.category || ""}
                  onChange={handleChange}
                  className={styles["dashboard__modal-input"]}
                  required
                >
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>
                  {menuItems
                    .filter((item) => item.category !== "todos")
                    .map((item) => (
                      <option key={item.category} value={item.category}>
                        {item.label}
                      </option>
                    ))}
                </select>
              </label>
              <label className={styles["dashboard__modal-label"]}>
                <b>Tecnologias (separadas por vírgula):</b>
                <input
                  type="text"
                  name="tecnologias"
                  value={
                    Array.isArray(editData.tecnologias)
                      ? editData.tecnologias.join(", ")
                      : ""
                  }
                  onChange={handleChangeArray}
                  className={styles["dashboard__modal-input"]}
                />
              </label>
              <label className={styles["dashboard__modal-label"]}>
                <b>Link:</b>
                <input
                  type="text"
                  name="link"
                  value={editData.link || ""}
                  onChange={handleChange}
                  className={styles["dashboard__modal-input"]}
                />
              </label>
              <label className={styles["dashboard__modal-label"]}>
                <b>Link Github:</b>
                <input
                  type="text"
                  name="linkGithub"
                  value={editData.linkGithub || ""}
                  onChange={handleChange}
                  className={styles["dashboard__modal-input"]}
                />
              </label>
              <label
                className={styles["dashboard__modal-label"]}
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <b>Destaque:</b>
                <input
                  type="checkbox"
                  name="destaque"
                  checked={!!editData.destaque}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      destaque: e.target.checked,
                    }))
                  }
                  style={{ marginLeft: 8 }}
                />
              </label>
              <div className={styles["dashboard__modal-actions"]}>
                <button
                  type="button"
                  onClick={closeModal}
                  className={styles["dashboard__modal-cancel"]}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles["dashboard__modal-save"]}
                >
                  Salvar
                </button>
              </div>
            </form>
          </>
        )}
      </Modal>
    </>
  );
}
