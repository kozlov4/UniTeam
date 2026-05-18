import React from "react";
import styles from "./Loader.module.css";

const Loader = ({ size = 40, message = "" }) => {
  return (
    <div className={styles.loaderWrapper}>
      <div
        className={styles.spinner}
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loader;
