import React from "react";
import styles from "./ModalHeader.module.css";
import ic_close from "../../../../../assets/icons/ic_close.svg";
import Logo from "../../../../Logo/Logo";
import { Link } from "react-router";

export default function ModalHeader({ onClose }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Logo />
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <img src={ic_close} alt="close" />
        </button>
      </div>
      <div className={styles.breadcrumbs}>
        <Link to={"/admin/projects"} className={styles.link}>
          Проекти
        </Link>
        <span className={styles.separator}> &gt; </span>
        <span className={styles.current}>Інформація про проєкт</span>
      </div>
    </div>
  );
}
