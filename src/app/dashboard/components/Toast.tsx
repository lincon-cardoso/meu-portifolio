import React from "react";
import styles from "../dashboard.module.scss";

export default function Toast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  if (!message) return null;

  const toastClass =
    type === "success"
      ? styles["dashboard__success-toast"]
      : styles["dashboard__error-toast"];

  return <div className={toastClass}>{message}</div>;
}
