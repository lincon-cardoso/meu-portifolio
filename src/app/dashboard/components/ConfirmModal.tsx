"use client";
import React from "react";
import Modal from "react-modal";
import styles from "../dashboard.module.scss";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title = "Confirmar",
  message,
  confirmLabel = "Sim",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel={title}
      className={styles["dashboard__modal"]}
      overlayClassName={styles["dashboard__modal-overlay"]}
      ariaHideApp={false}
    >
      <h3>{title}</h3>
      <p style={{ textAlign: "center", lineHeight: 1.4 }}>{message}</p>
      <div
        className={styles["dashboard__modal-actions"]}
        style={{ marginTop: 8 }}
      >
        <button
          type="button"
          onClick={onCancel}
          className={styles["dashboard__modal-cancel"]}
          disabled={loading}
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={styles["dashboard__modal-save"]}
          disabled={loading}
          style={loading ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
        >
          {loading ? "Apagando..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
