import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./EditUserModal.module.css";
import { getUser } from "../../../../services/users.service";
import { getTechnologies } from "../../../../services/project.service";
import {
  getSpecialties,
  toggleUserBlock,
  updateStudentProfile,
} from "../../../../services/admin.service";
import ic_close from "../../../../assets/icons/ic_close.svg";
import Logo from "../../../Logo/Logo";
import EditUserForm from "../../../EditUser/components/EditUserForm/EditUserForm";
import SkillsSection from "../../../EditUser/components/SkillsSection/SkillsSection";
import Reputation from "../../../EditUser/components/Reputation/Reputation";
import default_avatar from "../../../../assets/images/default_profile.png";

function EditUserModal({ isOpen = true, onClose, userId, email }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    specialty_id: null,
    technology_ids: [],
    // Додаткові поля для відображення в UI
    avatar_url: "",
    is_blocked: false,
    displaySkills: [],
  });

  const [dictionaries, setDictionaries] = useState({
    technologies: [],
    specialties: [],
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [user, techs, specs] = await Promise.all([
        getUser(userId),
        getTechnologies(),
        getSpecialties(),
      ]);

      setDictionaries({ technologies: techs, specialties: specs });

      const currentSpec = specs.find((s) => s.name === user.specialty_name);

      // Мапимо навички користувача на об'єкти з реальними ID зі словника
      const displaySkills =
        user.skill_names?.map((name) => {
          const foundTech = techs.find((t) => t.name === name);
          return foundTech
            ? { id: foundTech.id, name: foundTech.name }
            : { id: Math.random(), name };
        }) || [];

      setFormData({
        email: user.email || email || "",
        specialty_id: currentSpec?.id || "",
        avatar_url: user.avatar_url,
        is_blocked: user.is_blocked || false,
        displaySkills: displaySkills,
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && userId) {
      loadData();
    }
  }, [isOpen, userId]);

  const handleBlockToggle = async (status) => {
    try {
      await toggleUserBlock(userId, status);
      setFormData((prev) => ({ ...prev, is_blocked: status }));
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      specialty_id: Number(formData.specialty_id),
      technology_ids: formData.displaySkills.map((s) => s.id),
    };

    try {
      await updateStudentProfile(userId, payload);
      handleClose();
    } catch (error) {
      console.error("Update error:", error);
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
        <div className={styles.containerHead}>
          <div className={styles.header}>
            <Logo />
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
            >
              <img src={ic_close} alt="close" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.container}>
          <div className={styles.mainContent}>
            {/* Ліва колонка: Аватар та Блокування */}
            <div className={styles.leftCol}>
              <div className={styles.avatarWrapper}>
                <img
                  src={formData?.avatar_url || default_avatar}
                  alt="User avatar"
                  className={styles.avatar}
                />
              </div>
              <h2 className={styles.userEmailDisplay}>{email}</h2>

              <div className={styles.blockButtons}>
                <button
                  type="button"
                  className={styles.blockBtn}
                  onClick={() => handleBlockToggle(true)}
                >
                  Заблокувати
                </button>
                <button
                  type="button"
                  className={styles.unblockBtn}
                  onClick={() => handleBlockToggle(false)}
                >
                  Розблокувати
                </button>
              </div>
            </div>

            {/* Права колонка: Поля вводу та Навички */}
            <div className={styles.rightCol}>
              <EditUserForm
                formData={formData}
                setFormData={setFormData}
                specialties={dictionaries.specialties}
              />

              <SkillsSection
                allSkills={dictionaries.technologies}
                selectedSkills={formData.displaySkills}
                onChange={(newSkills) =>
                  setFormData({ ...formData, displaySkills: newSkills })
                }
              />
            </div>
          </div>

          <div className={styles.reputationWrapper}>
            <Reputation />
          </div>

          <div className={styles.footer}>
            <button type="submit" className={styles.saveBtn}>
              Зберегти зміни
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
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

export default EditUserModal;
