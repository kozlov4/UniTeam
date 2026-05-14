import React, { useState } from "react";
import styles from "./SearchSection.module.css";
import { X } from "lucide-react";

function SearchSection({ vacancies, formData, setFormData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredVacancies = vacancies.filter(
    (vacancy) =>
      vacancy.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !formData.teamRequirements.some((selected) => selected.id === vacancy.id),
  );

  const handleSelectVacancy = (vacancy) => {
    setFormData({
      ...formData,
      teamRequirements: [...formData.teamRequirements, vacancy],
    });
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleRemoveVacancy = (id) => {
    setFormData({
      ...formData,
      teamRequirements: formData.teamRequirements.filter((v) => v.id !== id),
    });
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Шукаємо в команду</h3>
      <div className={styles.tagsContainer}>
        {formData.teamRequirements.map((vacancy) => (
          <div key={vacancy.id} className={styles.tag}>
            {vacancy.name}
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => handleRemoveVacancy(vacancy.id)}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Хто потрібен у команду</label>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder="Введіть позицію"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
          />

          {isDropdownOpen && searchTerm && (
            <div className={styles.dropdown}>
              {filteredVacancies.length > 0 ? (
                filteredVacancies.map((vacancy) => (
                  <div
                    key={vacancy.id}
                    className={styles.dropdownItem}
                    onClick={() => handleSelectVacancy(vacancy)}
                  >
                    {vacancy.name}
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>Нічого не знайдено</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
