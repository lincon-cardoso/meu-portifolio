import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "../dashboard.module.scss";
import { Projeto } from "@/types/Projeto";
import { menuItems } from "@/utils/menuItems"; // Importe a constante menuItems

interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  projeto: Partial<Projeto> | null;
  onSave: (data: Partial<Projeto>) => void;
  onCancel: () => void;
}

export default function EditModal({
  isOpen,
  onRequestClose,
  projeto,
  onSave,
  onCancel,
}: Omit<EditModalProps, "onChange">) {
  const [editData, setEditData] = useState<Partial<Projeto>>({});
  const [tecnologiasInput, setTecnologiasInput] = useState("");

  useEffect(() => {
    setEditData(projeto || {}); // Atualiza o estado local quando o projeto muda
    if (projeto && Array.isArray(projeto.tecnologias)) {
      setTecnologiasInput(projeto.tecnologias.join(", "));
    } else {
      setTecnologiasInput("");
    }
  }, [projeto]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "tecnologias") {
      setTecnologiasInput(value);
    } else {
      setEditData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tecnologiasArray = tecnologiasInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSave({ ...editData, tecnologias: tecnologiasArray });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Projeto"
      className={styles["dashboard__modal"]}
      overlayClassName={styles["dashboard__modal-overlay"]}
      ariaHideApp={false}
    >
      <h3>Editar Projeto</h3>
      <form onSubmit={handleSubmit} className={styles["dashboard__modal-form"]}>
        <label className={styles["dashboard__modal-label"]}>
          <b>Título:</b>
          <input
            type="text"
            name="titulo"
            value={editData.titulo || ""}
            onChange={handleInputChange}
            className={styles["dashboard__modal-input"]}
            required
          />
        </label>
        <label className={styles["dashboard__modal-label"]}>
          <b>Descrição:</b>
          <textarea
            name="descricao"
            value={editData.descricao || ""}
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
            value={editData.category || ""}
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
            value={editData.link || ""}
            onChange={handleInputChange}
            className={styles["dashboard__modal-input"]}
          />
        </label>
        <label className={styles["dashboard__modal-label"]}>
          <b>Link Github:</b>
          <input
            type="url"
            name="linkGithub"
            value={editData.linkGithub || ""}
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
            checked={!!editData.destaque}
            onChange={handleCheckboxChange}
            style={{ marginLeft: 8 }}
          />
        </label>
        <div className={styles["dashboard__modal-actions"]}>
          <button
            type="button"
            onClick={onCancel}
            className={styles["dashboard__modal-cancel"]}
          >
            Cancelar
          </button>
          <button type="submit" className={styles["dashboard__modal-save"]}>
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}
