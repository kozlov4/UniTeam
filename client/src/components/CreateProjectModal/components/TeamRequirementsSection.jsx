import React, { useState } from "react";
import styles from "./TeamRequirementsSection.module.css";
import { ChevronDown, Trash, Search } from "lucide-react";

function TeamRequirementsSection({ formData, setFormData, vacancies = [], isOpen, onToggle }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSelect = (vacancy) => {
    if (!formData.teamRequirements.some(v => v.id === vacancy.id)) {
      setFormData({
        ...formData,
        teamRequirements: [...formData.teamRequirements, vacancy]
      });
    }
    onToggle(); // Close after select
  };

  const handleRemove = (vacancyId) => {
    setFormData({
      ...formData,
      teamRequirements: formData.teamRequirements.filter(v => v.id !== vacancyId)
    });
  };

  const filteredVacancies = vacancies.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Хто потрібен у команду</h3>
      
      <div className={styles.selectWrapper}>
        <button 
          type="button" 
          className={styles.selectButton}
          onClick={onToggle}
        >
          <span>Список спеціальностей</span>
          <ChevronDown size={20} className={isOpen ? styles.rotate : ""} />
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
              {filteredVacancies.map(v => (
                <div 
                  key={v.id} 
                  className={styles.dropdownItem}
                  onClick={() => handleSelect(v)}
                >
                  {v.name}
                </div>
              ))}
              {filteredVacancies.length === 0 && (
                <div className={styles.noResults}>Нічого не знайдено</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.tags}>
        {formData.teamRequirements.map(v => (
          <div key={v.id} className={styles.tag}>
            {v.name}
            <button type="button" onClick={() => handleRemove(v.id)}>
              <Trash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamRequirementsSection;
