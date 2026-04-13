import React from "react";
import heroImage from "../../assets/images/heroAuth.png";
import styles from "./AuthLayout.module.css";
import BackLink from "../BackLink/BackLink";

function AuthLayout({ children }) {
  return (
    <div className={styles.root}>
      <div className={styles.hero}>
        <img src={heroImage} alt="ХНУРЕ" className={styles.heroImg} />
      </div>

      <div className={styles.panel}>
        <BackLink className={styles.backLink}/>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
