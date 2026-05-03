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
      <div>
        <h2 className={styles.title}>Додати новий проєкт</h2>
        <p className={styles.subtitle}>
          Будь ласка, заповніть поля інформацією про Ваш проєкт
        </p>
      </div>

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
        <input
          type="text"
          name="projectGoal"
          className={styles.input}
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
        <span className={styles.charCount}>
          {formData.projectDescription.length}/1500
        </span>
      </div>
    </div>
  );
}

export default ProjectForm;
