import React from "react";
import styles from "./ModalHeader.module.css";
import ic_close from "../../../assets/icons/ic_close.svg";
import { NavLink } from "react-router";

function ModalHeader({ onClose }) {
  return (
    <div className={styles.header}>
      <div className={styles.breadcrumbs}>
        <NavLink to={"/projects"} className={styles.link}>
          Проєкти
        </NavLink>
        <span className={styles.separator}>&gt;</span>
        <span className={styles.current}>Створити проєкт</span>
      </div>

      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close modal"
      >
        <img src={ic_close} alt="close icon" />
      </button>
    </div>
  );
}

export default ModalHeader;
