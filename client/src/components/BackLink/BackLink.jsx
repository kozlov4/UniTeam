import React from "react";
import { Link } from "react-router-dom";
import arrowBackIcon from "../../assets/icons/arrowBack.svg";
import styles from "./BackLink.module.css";

function BackLink({ to = "/", children = "Назад", className = ""}) {
  return (
    <Link to={to} className={`${styles.backLink} ${className}`}>
      <img src={arrowBackIcon} alt="Back" className={styles.icon} />
      <span>{children}</span>
    </Link>
  );
}

export default BackLink;
