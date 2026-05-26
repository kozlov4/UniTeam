import React, { useState } from 'react';
import styles from './FilterPanel.module.css';
import { ChevronDown } from 'lucide-react';

const FilterPanel = ({ 
  title, 
  sections, 
  selectedFilters = {}, 
  onFilterChange, 
  onRangeChange,
  showMembersFilter = false,
  variant = 'default' 
}) => {
  const [openSections, setOpenSections] = useState(
    sections.reduce((acc, section) => ({ ...acc, [section.id]: true }), { members: true })
  );

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

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
      
      {showMembersFilter && (
        <div className={styles.section}>
          <div 
            className={styles.sectionHeader} 
            onClick={() => toggleSection('members')}
          >
            <h3 className={styles.sectionTitle}>Кількість учасників</h3>
            <ChevronDown 
              size={18} 
              className={`${styles.chevron} ${openSections.members ? styles.rotate : ""}`} 
            />
          </div>
          {openSections.members && (
            <div className={styles.rangeContainer}>
               <input 
                 type="range" 
                 min="1" 
                 max="100" 
                 step="1"
                 className={styles.rangeInput}
                 value={selectedFilters.max_members || 100}
                 onChange={(e) => onRangeChange(1, parseInt(e.target.value))}
               />
               <div className={styles.rangeLabels}>
                 <span>1</span>
                 <span>100+</span>
               </div>
            </div>
          )}
        </div>
      )}

      {sections.map((section) => (
        <div key={section.id} className={styles.section}>
          <div 
            className={styles.sectionHeader} 
            onClick={() => toggleSection(section.id)}
          >
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <ChevronDown 
              size={18} 
              className={`${styles.chevron} ${openSections[section.id] ? styles.rotate : ""}`} 
            />
          </div>

          {openSections[section.id] && (
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
              {section.options.length > 5 && (
                <button className={styles.showMore}>Показати більше</button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
