import React from "react";
import { X } from "lucide-react";
import styles from "./DeleteModal.module.css";

function DeleteModal({ isOpen, onClose, title, onDelete }) {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>

          <div className={styles.btnContainer}>
            <button className={styles.btnDelete} onClick={onDelete}>
              Видалити
            </button>
            <button className={styles.btnClose} onClick={onClose}>
              Скасувати
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
