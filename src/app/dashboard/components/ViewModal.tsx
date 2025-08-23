import React, { useMemo } from "react";
import Modal from "react-modal";
import { Projeto } from "@/types/Projeto";
import styles from "../dashboard.module.scss";
import { menuItems } from "@/utils/menuItems";

interface ViewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  projeto: Projeto | null;
}

export default function ViewModal({
  isOpen,
  onRequestClose,
  projeto,
}: ViewModalProps) {
  // Normalizações (executadas sempre, valores seguros se projeto nulo)
  const destaqueBool = useMemo(() => {
    if (!projeto) return false;
    const raw = projeto.destaque as unknown;
    if (typeof raw === "string") return raw === "true" || raw === "1";
    if (typeof raw === "number") return raw === 1;
    return !!raw;
  }, [projeto]);

  const categoryLabel = useMemo(() => {
    if (!projeto?.category) return "";
    const item = menuItems.find((m) => m.category === projeto.category);
    return item ? item.label : projeto.category;
  }, [projeto]);

  const tecnologiasStr = useMemo(() => {
    if (!projeto) return "";
    return Array.isArray(projeto.tecnologias)
      ? projeto.tecnologias.join(", ")
      : typeof projeto.tecnologias === "string"
        ? projeto.tecnologias
        : "";
  }, [projeto]);

  // Early return depois dos hooks
  if (!isOpen || !projeto) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Visualizar Projeto"
      className={styles["dashboard__modal"]}
      overlayClassName={styles["dashboard__modal-overlay"]}
      ariaHideApp={false}
    >
      <h3>Visualizar Projeto</h3>
      <form className={styles["dashboard__modal-form"]}>
        <label className={styles["dashboard__modal-label"]}>
          <b>Título:</b>
          <input
            type="text"
            value={projeto.titulo || ""}
            className={styles["dashboard__modal-input"]}
            disabled
            readOnly
          />
        </label>
        <label className={styles["dashboard__modal-label"]}>
          <b>Descrição:</b>
          <textarea
            value={projeto.descricao || ""}
            className={styles["dashboard__modal-textarea"]}
            rows={3}
            disabled
            readOnly
          />
        </label>
        <label className={styles["dashboard__modal-label"]}>
          <b>Categoria:</b>
          <input
            type="text"
            value={categoryLabel}
            className={styles["dashboard__modal-input"]}
            disabled
            readOnly
          />
        </label>
        <label className={styles["dashboard__modal-label"]}>
          <b>Tecnologias:</b>
          <input
            type="text"
            value={tecnologiasStr}
            className={styles["dashboard__modal-input"]}
            disabled
            readOnly
          />
        </label>
        <label className={styles["dashboard__modal-label"]}>
          <b>Link:</b>
          <input
            type="text"
            value={projeto.link || ""}
            className={styles["dashboard__modal-input"]}
            disabled
            readOnly
          />
        </label>
        <label className={styles["dashboard__modal-label"]}>
          <b>Link Github:</b>
          <input
            type="text"
            value={projeto.linkGithub || ""}
            className={styles["dashboard__modal-input"]}
            disabled
            readOnly
          />
        </label>
        <label
          className={styles["dashboard__modal-label"]}
          style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
        >
          <b>Destaque:</b>
          <input
            type="checkbox"
            checked={destaqueBool}
            disabled
            readOnly
            style={{ marginLeft: 8 }}
          />
        </label>
      </form>
    </Modal>
  );
}
