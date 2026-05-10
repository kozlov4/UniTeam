import React, { useState } from "react";
import styles from "./TechnologiesSection.module.css";
import { ChevronDown, Search } from "lucide-react";

function TechnologiesSection({ formData, setFormData, technologies, isOpen, onToggle }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleTechChange = (techId) => {
    const isSelected = formData.technologies.includes(techId);
    if (isSelected) {
      setFormData({
        ...formData,
        technologies: formData.technologies.filter((id) => id !== techId),
      });
    } else {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techId],
      });
    }
  };

  const filteredTechs = technologies.filter(tech => 
    tech.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Основные технології</h3>
      <div className={styles.selectWrapper}>
        <button
          type="button"
          className={styles.selectButton}
          onClick={onToggle}
        >
          <span>
            {formData.technologies && formData.technologies.length > 0
              ? `Обрано: ${formData.technologies.length}`
              : "Список технологій"}
          </span>
          <ChevronDown
            size={20}
            className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
          />
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Пошук..." 
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className={styles.optionsList}>
              {filteredTechs.map((tech) => (
                <label key={tech.id} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={formData.technologies?.includes(tech.id) || false}
                    onChange={() => handleTechChange(tech.id)}
                    className={styles.checkbox}
                  />
                  <span className={styles.optionText}>{tech.name}</span>
                </label>
              ))}
              {filteredTechs.length === 0 && (
                <div className={styles.noResults}>Нічого не знайдено</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologiesSection;
