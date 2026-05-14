import React, { useState } from "react";
import styles from "./CategorySelect.module.css";
import { ChevronDown } from "lucide-react";

function CategorySelect({ categories, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCategory = categories.find((cat) => cat.id === Number(value));

  const handleSelect = (id) => {
    onChange(id);
    setIsOpen(false);
  };
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label}>Категорія</label>

      <div className={styles.selectWrapper}>
        <div
          className={`${styles.selectControl} ${isOpen ? styles.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={selectedCategory ? styles.value : styles.placeholder}
          >
            {selectedCategory ? selectedCategory.name : "Оберіть категорію"}
          </span>
          <ChevronDown
            className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`}
            size={20}
          />
        </div>

        {isOpen && (
          <div className={styles.dropdown}>
            {categories.map((category) => (
              <div
                key={category.id}
                className={`${styles.option} ${Number(value) === category.id ? styles.selected : ""}`}
                onClick={() => handleSelect(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategorySelect;
