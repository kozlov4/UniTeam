import React, { useState } from "react";
import styles from "./TeamRequirementsSection.module.css";
import { ChevronDown, Trash, Search } from "lucide-react";

function TeamRequirementsSection({ formData, setFormData, isOpen, onToggle }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const specialties = [
    "Прикладна математика",
    "Інженерія програмного забезпечення",
    "Комп’ютерні науки",
    "Системний аналіз",
    "Кібербезпека",
    "Інформаційні системи та технології",
    "Комп’ютерна інженерія"
  ];

  const handleSelect = (spec) => {
    if (!formData.teamRequirements.includes(spec)) {
      setFormData({
        ...formData,
        teamRequirements: [...formData.teamRequirements, spec]
      });
    }
    onToggle(); // Close after select
  };

  const handleRemove = (spec) => {
    setFormData({
      ...formData,
      teamRequirements: formData.teamRequirements.filter(s => s !== spec)
    });
  };

  const filteredSpecs = specialties.filter(spec => 
    spec.toLowerCase().includes(searchTerm.toLowerCase())
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
              {filteredSpecs.map(spec => (
                <div 
                  key={spec} 
                  className={styles.dropdownItem}
                  onClick={() => handleSelect(spec)}
                >
                  {spec}
                </div>
              ))}
              {filteredSpecs.length === 0 && (
                <div className={styles.noResults}>Нічого не знайдено</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.tags}>
        {formData.teamRequirements.map(spec => (
          <div key={spec} className={styles.tag}>
            {spec}
            <button type="button" onClick={() => handleRemove(spec)}>
              <Trash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamRequirementsSection;
