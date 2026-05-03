import React, { useState } from "react";
import styles from "./TeamRequirementsSection.module.css";
import { Trash } from "lucide-react";
import ic_plus from "../../../assets/icons/ic_plus.svg";

function TeamRequirementsSection({ formData, setFormData }) {
  const [requirementInput, setRequirementInput] = useState("");

  const handleAddRequirement = () => {
    if (requirementInput.trim()) {
      setFormData({
        ...formData,
        teamRequirements: [...formData.teamRequirements, requirementInput],
      });
      setRequirementInput("");
    }
  };

  const handleRemoveRequirement = (index) => {
    setFormData({
      ...formData,
      teamRequirements: formData.teamRequirements.filter((_, i) => i !== index),
    });
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Хто потрібен у команду</h3>

      {formData.teamRequirements.map((requirement, index) => (
        <div key={index} className={styles.itemRow}>
          <span className={styles.itemText}>{requirement}</span>
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => handleRemoveRequirement(index)}
          >
            <Trash />
          </button>
        </div>
      ))}

      <div className={styles.inputRow}>
        <input
          type="text"
          className={styles.input}
          placeholder="Введіть позицію"
          value={requirementInput}
          onChange={(e) => setRequirementInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddRequirement();
            }
          }}
        />
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddRequirement}
        >
          <img src={ic_plus} alt="іконка додати" />
        </button>
      </div>
    </div>
  );
}

export default TeamRequirementsSection;
