import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animations";
import { submitApplication } from "../../services/applications.service";
import { X } from "lucide-react";
import { useToast } from "../../context/ToastContext";

export function ProjectSidebar({ styles, project, currentUser }) {
  const { showToast } = useToast();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { members = [], vacancies = [], leader, id: projectId } = project;
  
  // Check if current user is already in the team (either as member or leader)
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
      showToast("Помилка при поданні заявки. Спробуйте пізніше.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.aside initial="hidden" animate="visible" variants={fadeUp}>
      <div className={styles.sidebarCard}>
        <h3 className={styles.sidebarTitle}>Команда ({members.length})</h3>
        <div className={styles.teamList}>
          {members.length > 0 ? (
            members.map((member) => (
              <div key={member.id} className={styles.memberItem}>
                <img
                  src={
                    member.avatar_url ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`
                  }
                  alt={member.first_name}
                  className={styles.memberAvatar}
                />
                <div>
                  <div className={styles.memberName}>
                    {member.first_name} {member.last_name}
                  </div>
                  <div className={styles.memberRole}>
                    {member.id === leader?.id ? "Лідер" : "Учасник"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Учасників ще немає</p>
          )}
        </div>

        {leader && (
          <div className={styles.leaderSection}>
            <h3 className={styles.sidebarTitle}>Лідер команди</h3>
            <div className={styles.memberItem}>
              <img
                src={
                  leader.avatar_url ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${leader.id}`
                }
                alt="Leader"
                className={styles.memberAvatar}
              />
              <div className={styles.memberName}>
                {leader.first_name} {leader.last_name}
              </div>
            </div>
          </div>
        )}

        {/* Hide button if user is already a member */}
        {!isAlreadyMember && (
          <button
            className={styles.applyBtn}
            onClick={() => setShowApplyModal(true)}
          >
            Подати заявку
          </button>
        )}
      </div>

      {vacancies && vacancies.length > 0 && (
        <div className={styles.searchSection}>
          <h3 className={styles.sidebarTitle}>Шукаємо в команду</h3>
          <div className={styles.searchTags}>
            {vacancies.map((vacancy) => (
              <div key={vacancy.id} className={styles.searchTag}>
                {vacancy.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Redesigned Application Modal */}
      {showApplyModal && (
        <div className={styles.modalOverlay} onClick={() => setShowApplyModal(false)}>
          <div className={styles.applyModal} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalCloseX} 
              onClick={() => setShowApplyModal(false)}
            >
              <X size={24} />
            </button>
            
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
    </motion.aside>
  );
}
