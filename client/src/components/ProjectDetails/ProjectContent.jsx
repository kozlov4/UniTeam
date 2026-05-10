import React, { useState } from "react";
import { motion } from "framer-motion";
import { submitApplication } from "../../services/applications.service";
import { useToast } from "../../context/ToastContext";
import { fadeUp, stagger } from "../../utils/animations";

export function ProjectContent({ styles, project, currentUser }) {
  const { showToast } = useToast();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { title, goal, description, vacancies = [], id: projectId, members = [], leader } = project;
  
  const isAlreadyMember = 
    members.some(m => m.id === currentUser?.id) || 
    leader?.id === currentUser?.id;

  const handleApply = async (e) => {
    e.preventDefault();
    if (coverLetter.length < 50) {
      showToast("Супровідний лист має бути не менше 50 символів.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitApplication({
        project_id: projectId,
        cover_letter: coverLetter,
      });
      showToast("Заявку успішно надіслано!");
      setShowApplyModal(false);
      setCoverLetter("");
    } catch (error) {
      console.error("Failed to submit application:", error);
      showToast("Помилка при поданні заявки. Спробуйте пізніше.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section variants={stagger} initial="hidden" animate="visible" className={styles.leftContent}>
      <h1 className={styles.projectTitle}>{title}</h1>
      <span className={styles.projectCategoryTag}>
        {project.category?.name || "Web-розробка"}
      </span>

      <div className={styles.detailSection} variants={fadeUp}>
        <h3 className={styles.sectionHeading}>Мета проєкту</h3>
        <p className={styles.sectionParagraph}>{goal}</p>
      </div>

      <div className={styles.detailSection} variants={fadeUp}>
        <h3 className={styles.sectionHeading}>Опис проєкту</h3>
        <p className={styles.sectionParagraph}>{description}</p>
      </div>

      {vacancies.length > 0 && (
        <div className={styles.detailSection} variants={fadeUp}>
          <h3 className={styles.sectionHeading}>Шукаємо в команду</h3>
          <div className={styles.vacanciesList}>
            {vacancies.map((v) => (
              <span key={v.id} className={styles.vacancyTag}>
                {v.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {!isAlreadyMember && (
        <button 
          className={styles.mainApplyBtn}
          onClick={() => setShowApplyModal(true)}
        >
          Подати заявку
        </button>
      )}

      {/* Application Modal integrated here as it's triggered from left column now */}
      {showApplyModal && (
        <div className={styles.modalOverlay} onClick={() => setShowApplyModal(false)}>
          <div className={styles.applyModal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.applyModalTitle}>
              Напишіть короткий супроводжувальний лист, чому Вас мають обрати
            </h3>
            
            <div className={styles.applyTextareaWrapper}>
              <textarea
                className={styles.applyTextarea}
                placeholder="Коротко опишіть себе"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                maxLength={1500}
              />
              <span className={styles.applyCharCount}>
                {coverLetter.length}/1500
              </span>
            </div>
            
            <div className={styles.applyModalActions}>
              <button 
                type="button"
                className={styles.applyCancelBtn}
                onClick={() => setShowApplyModal(false)}
              >
                Скасувати
              </button>
              <button 
                type="button"
                className={styles.applySubmitBtn}
                onClick={handleApply}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Надсилання..." : "Надіслати"}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
