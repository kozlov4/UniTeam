import React, { useState } from "react";
import styles from "./ButtonAddSkill.module.css";

function ButtonAddSkill({ availableSkills, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.addWrapper}>
      <button
        type="button"
        className={styles.addBtn}
        onClick={() => setIsOpen(!isOpen)}
      >
        Додати +
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {availableSkills.length > 0 ? (
            availableSkills.map((skill) => (
              <div
                key={skill.id}
                className={styles.dropdownItem}
                onClick={() => {
                  onSelect(skill);
                  setIsOpen(false);
                }}
              >
                {skill.name}
              </div>
            ))
          ) : (
            <div className={styles.noData}>Немає доступних навичок</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ButtonAddSkill;
