import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateProjectModal.module.css";
import ModalHeader from "./components/ModalHeader";
import ProjectForm from "./components/ProjectForm";
import ProjectImageUpload from "./components/ProjectImageUpload";
import TechnologiesSection from "./components/TechnologiesSection";
import TeamMembersSection from "./components/TeamMembersSection";
import TeamRequirementsSection from "./components/TeamRequirementsSection";
import { createProject, getCategories, getTechnologies, uploadImage } from "../../services/projects.service";
import { ChevronDown, Search } from "lucide-react";
import { useToast } from "../../context/ToastContext";

function CreateProjectModal({ isOpen = true, onClose, onSubmit }) {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [activeMenu, setActiveMenu] = useState(null);
  const [categorySearch, setCategorySearch] = useState("");
  
  const [formData, setFormData] = useState({
    projectName: "",
    projectGoal: "",
    projectDescription: "",
    projectImage: null,
    categoryId: "",
    technologies: [],
    teamMembers: [],
    teamRequirements: [],
  });

  const [technologies, setTechnologies] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [techs, cats] = await Promise.all([
          getTechnologies(),
          getCategories(),
        ]);
        setTechnologies(Array.isArray(techs) ? techs : techs?.items || []);
        setCategories(Array.isArray(cats) ? cats : cats?.items || []);
      } catch (error) {
        showToast(
          "Виникла помилка при завантаженні даних для форми.",
          "error",
        );
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleCategorySelect = (id) => {
    setFormData({ ...formData, categoryId: id });
    setActiveMenu(null);
    setCategorySearch("");
  };

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
    if (menuName !== 'category') setCategorySearch("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.projectName || !formData.projectGoal || !formData.projectDescription || !formData.categoryId) {
      showToast("Будь ласка, заповніть основні поля проєкту та оберіть категорію.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = "";
      
      // Upload image first if selected
      if (formData.projectImage) {
        try {
          const uploadResponse = await uploadImage(formData.projectImage);
          imageUrl = uploadResponse.url || uploadResponse.image_url || "";
        } catch (uploadError) {
          showToast("Не вдалося завантажити зображення, створюємо без нього.", "info");
        }
      }

      const projectData = {
        title: formData.projectName,
        goal: formData.projectGoal,
        description: formData.projectDescription,
        category_id: parseInt(formData.categoryId),
        image_url: imageUrl,
        tech_ids: formData.technologies.map(t => typeof t === 'object' ? t.id : t),
        participant_ids: formData.teamMembers.map(m => m.id),
      };

      if (onSubmit) {
        await onSubmit(projectData);
      } else {
        await createProject(projectData);
        showToast("Проєкт успішно створено!");
        navigate("/dashboard");
      }
    } catch (error) {
      showToast("Помилка при створенні проєкту.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const selectedCategoryName = categories.find(c => c.id === parseInt(formData.categoryId))?.name || "Обрати категорію";

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
              <ProjectImageUpload formData={formData} setFormData={setFormData} />

              <div className={styles.selectSection}>
                <h3 className={styles.sectionTitle}>Категорія</h3>
                <div className={styles.selectWrapper}>
                  <button 
                    type="button" 
                    className={styles.selectButton}
                    onClick={() => toggleMenu('category')}
                  >
                    <span>{selectedCategoryName}</span>
                    <ChevronDown size={20} className={activeMenu === 'category' ? styles.rotate : ""} />
                  </button>
                  {activeMenu === 'category' && (
                    <div className={`${styles.dropdown} ${styles.fullHeight} ${styles.column}`}>
                      <div className={styles.searchBox}>
                        <Search size={16} className={styles.searchIcon} />
                        <input 
                          type="text" 
                          placeholder="Пошук..." 
                          className={styles.searchInput}
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className={styles.optionsList}>
                        {filteredCategories.map(cat => (
                          <div 
                            key={cat.id} 
                            className={styles.dropdownItem}
                            onClick={() => handleCategorySelect(cat.id)}
                          >
                            {cat.name}
                          </div>
                        ))}
                        {filteredCategories.length === 0 && (
                          <div className={styles.noResults}>Нічого не знайдено</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <TechnologiesSection 
                formData={formData} 
                setFormData={setFormData} 
                technologies={technologies}
                isOpen={activeMenu === 'tech'}
                onToggle={() => toggleMenu('tech')}
              />

              <TeamRequirementsSection 
                formData={formData} 
                setFormData={setFormData}
                isOpen={activeMenu === 'specialty'}
                onToggle={() => toggleMenu('specialty')}
              />

              <TeamMembersSection 
                formData={formData} 
                setFormData={setFormData} 
              />
            </div>
          </div>

          <div className={styles.footer}>
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? "Створення..." : "Створити"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;
