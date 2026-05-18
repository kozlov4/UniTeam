import React from "react";
import styles from "./MainInfo.module.css";
import CardInfo from "../CardInfo/CardInfo";

function MainInfo({ info }) {
  return (
    <section className={styles.section}>
      <CardInfo
        title="Кількість студентів"
        value={info.students_count}
        variant="light"
      />

      <CardInfo
        title="Кількість проектів"
        value={info.projects_count}
        variant="blue"
      />

      <CardInfo
        title="Кількість технологій"
        value={info.technologies_count}
        variant="beige"
      />
    </section>
  );
}

export default MainInfo;
