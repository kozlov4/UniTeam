import React from "react";
import styles from "./ProjectForm.module.css";

function ProjectForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className={styles.formSection}>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Назва проекту</label>
        <input
          type="text"
          name="projectName"
          className={styles.input}
          placeholder="Вкажіть назву проєкту"
          value={formData.projectName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Мета проекту</label>
        <textarea
          type="text"
          name="projectGoal"
          className={styles.textarea}
          placeholder="Вкажіть мету проєкту"
          value={formData.projectGoal}
          onChange={handleChange}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Опис проекту</label>
        <textarea
          name="projectDescription"
          className={styles.textarea}
          placeholder="Коротко опишіть сутність проєкту"
          rows="6"
          value={formData.projectDescription}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default ProjectForm;
