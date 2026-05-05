import React from 'react';
import styles from './FilterPanel.module.css';

const FilterPanel = ({ title, sections, variant = 'default' }) => {
  return (
    <div className={`${styles.panel} ${styles[variant]}`}>
      <h2 className={styles.title}>{title || 'Фільтр'}</h2>
      
      {sections.map((section, idx) => (
        <div key={idx} className={styles.section}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
          <div className={styles.options}>
            {section.options.map((opt, oIdx) => (
              <label key={oIdx} className={styles.checkboxLabel}>
                <div className={styles.checkboxWrapper}>
                  <input type="checkbox" className={styles.checkbox} />
                  <span className={styles.checkmark}></span>
                </div>
                <span className={styles.optionText}>{opt}</span>
              </label>
            ))}
          </div>
          <button className={styles.showMore}>Show more</button>
        </div>
      ))}

      {title === 'Фільтр' && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Кількість учасників</h3>
          <div className={styles.rangeContainer}>
             <input type="range" className={styles.range} min="1" max="100" defaultValue="50" />
             <div className={styles.rangeLabels}>
               <span>1</span>
               <span>100+</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
