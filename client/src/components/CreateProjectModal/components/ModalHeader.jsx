import React from "react";
import styles from "./ModalHeader.module.css";
import { X } from "lucide-react";

function ModalHeader({ onClose }) {
  return (
    <div className={styles.header}>
      <div className={styles.breadcrumbs}>
        <span className={styles.link}>Проєкти</span>
        <span className={styles.separator}>›</span>
        <span className={styles.current}>Створити проєкт</span>
      </div>

      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close modal"
      >
        <X size={24} />
      </button>
    </div>
  );
}

export default ModalHeader;
