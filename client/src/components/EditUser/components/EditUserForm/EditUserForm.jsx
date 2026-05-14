import React from "react";
import styles from "./EditUserForm.module.css";
import Input from "../Input/Input";

function EditUserForm({ formData, setFormData, specialties = [] }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className={styles.formWrapper}>
      <Input
        label="Email"
        name="email"
        placeholder="Введіть новий email"
        value={formData.email || ""}
        onChange={handleChange}
      />

      <div className={styles.inputContainer}>
        <label className={styles.label}>Спеціальність</label>
        <select
          name="specialty_id"
          className={styles.select}
          value={formData.specialty_id || ""}
          onChange={handleChange}
        >
          <option value="" disabled>
            Оберіть спеціальність
          </option>
          {specialties.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default EditUserForm;
