"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "../dashboard.module.scss";
import { menuItems } from "@/utils/menuItems";
import { Projeto } from "@/types/Projeto";

interface CreateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCreate: (data: Partial<Projeto>) => void;
  loading?: boolean;
}

const emptyData: Partial<Projeto> = {
  titulo: "",
  descricao: "",
  category: "",
  tecnologias: [],
  link: "",
  linkGithub: "",
  destaque: false,
};

export default function CreateModal({
  isOpen,
  onRequestClose,
  onCreate,
  loading = false,
}: CreateModalProps) {
  const [formData, setFormData] = useState<Partial<Projeto>>(emptyData);
  const [tecnologiasInput, setTecnologiasInput] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData(emptyData);
      setTecnologiasInput("");
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "tecnologias") {
      setTecnologiasInput(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const tecnologiasArray = tecnologiasInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onCreate({ ...formData, tecnologias: tecnologiasArray });
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Criar Projeto"
      className={styles["dashboard__modal"]}
      overlayClassName={styles["dashboard__modal-overlay"]}
      ariaHideApp={false}
    >
      <h3>Novo Projeto</h3>
      <form onSubmit={handleSubmit} className={styles["dashboard__modal-form"]}>
        <label className={styles["dashboard__modal-label"]}>
          <b>Título:</b>
          <input
            type="text"
            name="titulo"
            value={formData.titulo || ""}
            onChange={handleInputChange}
            className={styles["dashboard__modal-input"]}
            required
          />
        </label>
        <label className={styles["dashboard__modal-label"]}>
          <b>Descrição:</b>
          <textarea
            name="descricao"
            value={formData.descricao || ""}
            onChange={handleInputChange}
            className={styles["dashboard__modal-textarea"]}
            rows={3}
            required
          />
        </label>
        <label className={styles["dashboard__modal-label"]}>
          <b>Categoria:</b>
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleInputChange}
            className={styles["dashboard__modal-input"]}
            required
          >
            <option value="">Selecione uma categoria</option>
            {menuItems.map((item: { category: string; label: string }) => (
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
            value={tecnologiasInput}
            onChange={handleInputChange}
            placeholder="ex: React, TypeScript, Node.js"
            className={styles["dashboard__modal-input"]}
          />
        </label>
        <label className={styles["dashboard__modal-label"]}>
          <b>Link:</b>
          <input
            type="url"
            name="link"
            value={formData.link || ""}
            onChange={handleInputChange}
            className={styles["dashboard__modal-input"]}
          />
        </label>
        <label className={styles["dashboard__modal-label"]}>
          <b>Link Github:</b>
          <input
            type="url"
            name="linkGithub"
            value={formData.linkGithub || ""}
            onChange={handleInputChange}
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
            checked={!!formData.destaque}
            onChange={handleCheckboxChange}
            style={{ marginLeft: 8 }}
          />
        </label>
        <div className={styles["dashboard__modal-actions"]}>
          <button
            type="button"
            onClick={onRequestClose}
            className={styles["dashboard__modal-cancel"]}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles["dashboard__modal-save"]}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Criar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
