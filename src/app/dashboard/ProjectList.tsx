"use client";

import { useState } from "react";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import styles from "./dashboard.module.scss";
import Toast from "./components/Toast";
import ViewModal from "./components/ViewModal";
import EditModal from "./components/EditModal";
import ConfirmModal from "./components/ConfirmModal";
import CreateModal from "./components/CreateModal";
import { Projeto } from "@/types/Projeto"; // Garantir que o tipo correto seja usado

export default function ProjectList({ projetos }: { projetos: Projeto[] }) {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewProjeto, setViewProjeto] = useState<Projeto | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProjeto, setEditProjeto] = useState<Projeto | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [projetosState, setProjetosState] = useState<Projeto[]>(projetos);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projetoToDelete, setProjetoToDelete] = useState<Projeto | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleView = (projeto: Projeto) => {
    const currentProjeto = projetosState.find((p) => p.id === projeto.id);
    console.log(
      "1. [Visualizar] Projeto encontrado no estado:",
      currentProjeto
    );
    if (!currentProjeto) return;

    // Garante que destaque seja booleano
    let destaqueValue = currentProjeto.destaque;
    if (typeof destaqueValue === "string") {
      destaqueValue = destaqueValue === "true" || destaqueValue === "1";
    } else if (typeof destaqueValue === "number") {
      destaqueValue = destaqueValue === 1;
    }
    console.log("2. [Visualizar] Valor final do destaque:", !!destaqueValue);
    setViewProjeto({ ...currentProjeto, destaque: !!destaqueValue });
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setViewProjeto(null);
  };

  const handleEdit = (projeto: Projeto) => {
    // Garantir que usamos a versão mais recente do estado
    const currentProjeto =
      projetosState.find((p) => p.id === projeto.id) || projeto;
    console.log("[Editar] Projeto clicado:", currentProjeto);
    // Normaliza destaque em boolean
    let destaqueValue: boolean | string | number | undefined =
      currentProjeto.destaque as unknown as
        | boolean
        | string
        | number
        | undefined;
    if (typeof destaqueValue === "string") {
      destaqueValue = destaqueValue === "true" || destaqueValue === "1";
    } else if (typeof destaqueValue === "number") {
      destaqueValue = destaqueValue === 1;
    } else {
      destaqueValue = !!destaqueValue;
    }
    setEditProjeto({ ...currentProjeto, destaque: destaqueValue });
    setEditModalOpen(true);
    console.log("[Editar] Modal deve abrir agora. Estado editModalOpen = true");
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditProjeto(null);
  };

  const openDeleteModal = (projeto: Projeto) => {
    setProjetoToDelete(projeto);
    setDeleteModalOpen(true);
  };

  const cancelDelete = () => {
    if (deleting) return;
    setDeleteModalOpen(false);
    setProjetoToDelete(null);
  };

  const confirmDelete = async () => {
    if (!projetoToDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/projetos/${projetoToDelete.id}`, {
        method: "DELETE",
      });
      if (!(res.ok || res.status === 204)) throw new Error("Erro ao apagar");
      setProjetosState((prev) =>
        prev.filter((p) => p.id !== projetoToDelete.id)
      );
      setSuccessMsg("Projeto apagado com sucesso!");
      setTimeout(() => setSuccessMsg(""), 1500);
      setDeleteModalOpen(false);
      setProjetoToDelete(null);
    } catch (e) {
      console.error("Erro ao apagar projeto", e);
      setErrorMsg("Erro ao apagar projeto!");
      setTimeout(() => setErrorMsg(""), 2000);
    } finally {
      setDeleting(false);
    }
  };

  const handleSaveEdit = async (data: Partial<Projeto>) => {
    if (!editProjeto) return;
    try {
      const res = await fetch(`/api/projetos/${editProjeto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erro ao atualizar");
      const updated = (await res.json()) as Projeto;
      setProjetosState((prev) =>
        prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
      );
      setSuccessMsg("Projeto atualizado com sucesso!");
      setTimeout(() => setSuccessMsg(""), 1500);
      closeEditModal();
    } catch (e) {
      console.error("Erro ao atualizar projeto", e);
      setErrorMsg("Erro ao atualizar projeto!");
      setTimeout(() => setErrorMsg(""), 2000);
    }
  };

  const handleCancelEdit = () => {
    closeEditModal();
  };

  // Criação
  const openCreateModal = () => {
    setCreateModalOpen(true);
  };
  const closeCreateModal = () => {
    if (creating) return;
    setCreateModalOpen(false);
  };
  const handleCreate = async (data: Partial<Projeto>) => {
    setCreating(true);
    try {
      const res = await fetch("/api/projetos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erro ao criar");
      const novo = await res.json();
      setProjetosState((prev) => [novo, ...prev]);
      setSuccessMsg("Projeto criado com sucesso!");
      setTimeout(() => setSuccessMsg(""), 1500);
      setCreateModalOpen(false);
    } catch (e) {
      console.error("Erro ao criar projeto", e);
      setErrorMsg("Erro ao criar projeto!");
      setTimeout(() => setErrorMsg(""), 2000);
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <Toast message={successMsg} type="success" />
      <Toast message={errorMsg} type="error" />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginBottom: 16,
        }}
      >
        <button
          className={styles["dashboard__btn-criar"]}
          type="button"
          onClick={openCreateModal}
          disabled={creating || editModalOpen || deleteModalOpen}
          style={{ opacity: creating ? 0.7 : 1 }}
        >
          {creating ? "Criando..." : "+ Criar Projeto"}
        </button>
      </div>
      <ul className={styles["dashboard__projects-list"]}>
        {projetosState.length === 0 && (
          <li className={styles["dashboard__no-projects"]}>
            Nenhum projeto encontrado.
          </li>
        )}
        {projetosState.map((projeto: Projeto) => (
          <li key={projeto.id} className={styles["dashboard__project-item"]}>
            <Link
              href={`/projetos/${slugify(projeto.titulo || projeto.nome || projeto.name || "")}`}
              className={styles["dashboard__project-name"]}
              prefetch={true}
            >
              {projeto.nome || projeto.titulo || projeto.name}
            </Link>
            {/* editar projeto */}
            <button
              className={styles["dashboard__btn-editar"]}
              onClick={() => handleEdit(projeto)}
              style={{ marginLeft: 8 }}
            >
              Editar
            </button>
            {/*  visualizar projeto */}
            <button
              className={styles["dashboard__btn-visualizar"]}
              onClick={() => handleView(projeto)}
            >
              Visualizar
            </button>
            {/* apagar */}
            <button
              className={styles["dashboard__btn-apagar"]}
              onClick={() => openDeleteModal(projeto)}
              style={{ marginLeft: 8 }}
            >
              Apagar
            </button>
          </li>
        ))}
      </ul>

      <ViewModal
        isOpen={viewModalOpen}
        onRequestClose={closeViewModal}
        projeto={viewProjeto}
      />
      <EditModal
        isOpen={editModalOpen}
        onRequestClose={closeEditModal}
        projeto={editProjeto || null}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Apagar Projeto"
        message={
          projetoToDelete
            ? `Tem certeza que deseja apagar o projeto "${projetoToDelete.titulo || projetoToDelete.nome || projetoToDelete.name || "(sem título)"}"? Esta ação não poderá ser desfeita.`
            : "Tem certeza que deseja apagar este projeto?"
        }
        confirmLabel="Apagar"
        cancelLabel="Cancelar"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={deleting}
      />
      <CreateModal
        isOpen={createModalOpen}
        onRequestClose={closeCreateModal}
        onCreate={handleCreate}
        loading={creating}
      />
    </>
  );
}
