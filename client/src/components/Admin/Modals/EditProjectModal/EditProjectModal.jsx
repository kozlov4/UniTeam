import { useEffect, useState } from "react";
import {
  getCategories,
  getProjectById,
  getTechnologies,
  getVacancies,
} from "../../../../services/project.service";
import { uploadImage } from "../../../../services/upload.service";
import { updateAdminProject } from "../../../../services/admin.service";
import { useNavigate } from "react-router";
import styles from "./EditProjectModal.module.css";
import ModalHeader from "./components/ModalHeader";
import ProjectForm from "./components/ProjectForm";
import SearchSection from "./components/SearchSection";
import ProjectImageUpload from "./components/ProjectImageUpload";
import CategorySelect from "./components/CategorySelect";
import TechnologiesSection from "./components/TechnologiesSection";
import TeamMembersSection from "./components/TeamMembersSection";
import TeamLeaderSection from "./components/TeamLeaderSection";

function EditProjectModal({ isOpen = true, onClose, projectId }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    projectName: "",
    projectGoal: "",
    projectDescription: "",
    projectImage: null,
    category_id: "",
    technologies: [],
    teamMembers: [],
    teamLeader: null,
    teamRequirements: [],
  });

  const [dictionaries, setDictionaries] = useState({
    technologies: [],
    categories: [],
    vacancies: [],
  });

  const loadInitialData = async () => {
    try {
      setLoading(true);

      const techs = await getTechnologies();
      const cats = await getCategories();
      const vacs = await getVacancies();
      const project = await getProjectById(projectId);

      setDictionaries({
        technologies: techs,
        categories: cats,
        vacancies: vacs,
      });

      setFormData({
        projectName: project.title,
        projectGoal: project.goal,
        projectDescription: project.description,
        projectImage: project.image_url,
        category_id: project.category?.id,
        technologies: project.technologies,
        teamMembers: project.members,
        teamLeader: project.leader,
        teamRequirements: project.vacancies,
      });
    } catch (error) {
      console.error("Помилка завантаження даних:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && projectId) {
      loadInitialData();
    }
  }, [isOpen, projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let currentImageUrl = formData.projectImage;

      if (formData.projectImage instanceof File) {
        currentImageUrl = await uploadImage(formData.projectImage);
      }

      const payload = {
        title: formData.projectName,
        goal: formData.projectGoal,
        description: formData.projectDescription,
        image_url: currentImageUrl.image_url,
        category_id: Number(formData.category_id),
        tech_ids: formData.technologies.map((t) => t.id || t),
        vacancy_ids: formData.teamRequirements.map((v) => v.id || v),
        participant_ids: formData.teamMembers.map((m) => m.id || m),
      };

      await updateAdminProject(projectId, payload);
      handleClose();
    } catch (error) {
      console.error("Помилка при оновленні:", error);
    }
  };

  const handleClose = () => {
    onClose ? onClose() : navigate(-1);
  };

  if (!isOpen) return null;
  if (loading)
    return <div className={styles.modalOverlay}>Завантаження...</div>;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <ModalHeader onClose={handleClose} />

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.contentWrapper}>
            <div className={styles.leftSection}>
              <ProjectForm
                formData={formData}
                setFormData={setFormData}
                categories={dictionaries.categories}
              />
              <SearchSection
                formData={formData}
                setFormData={setFormData}
                vacancies={dictionaries.vacancies}
              />
            </div>

            <div className={styles.rightSection}>
              <ProjectImageUpload
                formData={formData}
                setFormData={setFormData}
              />

              <CategorySelect
                categories={dictionaries.categories}
                value={formData.category_id}
                onChange={(id) => setFormData({ ...formData, category_id: id })}
              />

              <TechnologiesSection
                formData={formData}
                setFormData={setFormData}
                technologies={dictionaries.technologies}
              />

              <TeamMembersSection
                formData={formData}
                setFormData={setFormData}
              />

              <TeamLeaderSection
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="submit" className={styles.submitBtn}>
              Зберегти зміни
            </button>
            <button
              type="button"
              className={styles.resetButton}
              onClick={handleClose}
            >
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjectModal;
