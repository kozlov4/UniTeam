import React from 'react';
import styles from './FilterPanel.module.css';

const FilterPanel = ({ title, sections, selectedFilters = {}, onFilterChange, variant = 'default' }) => {
  const handleCheckboxChange = (sectionId, optionValue) => {
    const currentSectionFilters = selectedFilters[sectionId] || [];
    const isSelected = currentSectionFilters.includes(optionValue);
    
    let newSectionFilters;
    if (isSelected) {
      newSectionFilters = currentSectionFilters.filter(val => val !== optionValue);
    } else {
      newSectionFilters = [...currentSectionFilters, optionValue];
    }
    
    onFilterChange(sectionId, newSectionFilters);
  };

  return (
    <div className={`${styles.panel} ${styles[variant]}`}>
      <h2 className={styles.title}>{title || 'Фільтр'}</h2>
      
      {sections.map((section) => (
        <div key={section.id} className={styles.section}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
          <div className={styles.options}>
            {section.options.map((opt) => (
              <label key={opt.id} className={styles.checkboxLabel}>
                <div className={styles.checkboxWrapper}>
                  <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={(selectedFilters[section.id] || []).includes(opt.id)}
                    onChange={() => handleCheckboxChange(section.id, opt.id)}
                  />
                  <span className={styles.checkmark}></span>
                </div>
                <span className={styles.optionText}>{opt.name}</span>
              </label>
            ))}
          </div>
          {section.options.length > 5 && (
            <button className={styles.showMore}>Показати більше</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
