import React from "react";
import styles from "./SkillsSection.module.css";
import SkillCard from "../SkillCard/SkillCard";
import ButtonAddSkill from "../ButtonAddSkill/ButtonAddSkill";

function SkillsSection({ allSkills, selectedSkills, onChange }) {
  const handleRemove = (id) => {
    onChange(selectedSkills.filter((s) => s.id !== id));
  };

  const handleAdd = (skill) => {
    if (!selectedSkills.find((s) => s.id === skill.id)) {
      onChange([...selectedSkills, skill]);
    }
  };

  const available = allSkills.filter(
    (s) => !selectedSkills.find((selected) => selected.id === s.id),
  );
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Навички</h3>

      <div className={styles.list}>
        {selectedSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} onRemove={handleRemove} />
        ))}
      </div>

      <ButtonAddSkill availableSkills={available} onSelect={handleAdd} />
    </div>
  );
}

export default SkillsSection;
