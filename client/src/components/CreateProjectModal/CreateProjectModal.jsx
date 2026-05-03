import React, { useState, useEffect } from "react";
import styles from "./CreateProjectModal.module.css";
import ModalHeader from "./components/ModalHeader";
import ProjectForm from "./components/ProjectForm";
import ProjectImageUpload from "./components/ProjectImageUpload";
import TechnologiesSection from "./components/TechnologiesSection";
import TeamMembersSection from "./components/TeamMembersSection";
import TeamLeaderSection from "./components/TeamLeaderSection";
import TeamRequirementsSection from "./components/TeamRequirementsSection";
import Button from "../Button/Button";

function CreateProjectModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    projectName: "",
    projectGoal: "",
    projectDescription: "",
    projectImage: null,
    technologies: [],
    teamMembers: [],
    teamLeader: [],
    teamRequirements: [],
  });

  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      // TODO: Замінити на реальний API call
      // const response = await fetch("/api/technologies");
      // const data = await response.json();
      // setTechnologies(data);

      setTechnologies([
        { id: 1, name: "React" },
        { id: 2, name: "Node.js" },
        { id: 3, name: "MongoDB" },
        { id: 4, name: "TypeScript" },
        { id: 5, name: "Vue.js" },
      ]);
    } catch (error) {
      console.error("Error fetching technologies:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <ModalHeader onClose={onClose} />

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.contentWrapper}>
            <div className={styles.leftSection}>
              <ProjectForm formData={formData} setFormData={setFormData} />
            </div>

            <div className={styles.rightSection}>
              <ProjectImageUpload
                formData={formData}
                setFormData={setFormData}
              />

              <TechnologiesSection
                formData={formData}
                setFormData={setFormData}
                technologies={technologies}
              />

              <TeamMembersSection
                formData={formData}
                setFormData={setFormData}
              />

              <TeamLeaderSection
                formData={formData}
                setFormData={setFormData}
              />

              <TeamRequirementsSection
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.resetButton}>
              Зберегти як чорнетку
            </button>
            <button type="submit" className={styles.submitBtn}>
              Створити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;
