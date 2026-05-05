import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateProjectModal.module.css";
import ModalHeader from "./components/ModalHeader";
import ProjectForm from "./components/ProjectForm";
import ProjectImageUpload from "./components/ProjectImageUpload";
import TechnologiesSection from "./components/TechnologiesSection";
import TeamMembersSection from "./components/TeamMembersSection";
import TeamLeaderSection from "./components/TeamLeaderSection";
import TeamRequirementsSection from "./components/TeamRequirementsSection";

function CreateProjectModal({ isOpen = true, onClose, onSubmit }) {
  const navigate = useNavigate();
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

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Project created:", formData);
      navigate("/dashboard");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <ModalHeader onClose={handleClose} />

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
