import React from "react";
import styles from "./ProjectForm.module.css";

const ProjectForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.formSection}>
      <div className={styles.headerInfo}>
        <h2 className={styles.title}>Додати новий проєкт</h2>
        <p className={styles.subtitle}>
          Будь ласка, заповніть поля інформацією про Ваш проєкт
        </p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Назва проєкту</label>
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
        <label className={styles.label}>Мета проєкту</label>
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
        <label className={styles.label}>Опис проєкту</label>
        <div className={styles.textareaWrapper}>
          <textarea
            name="projectDescription"
            className={styles.textarea}
            placeholder="Коротко опишіть сутність проєкту."
            value={formData.projectDescription}
            onChange={handleChange}
          />
          <span className={styles.charCount}>
            {formData.projectDescription.length}/1500
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
