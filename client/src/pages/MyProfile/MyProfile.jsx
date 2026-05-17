import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import styles from "./MyProfile.module.css";
import { useToast } from "../../context/ToastContext";
import { getCurrentUser, updateMyProfile } from "../../services/users.service";
import { getTechnologies } from "../../services/project.service";
import { getSpecialties } from "../../services/admin.service";
import Loader from "../../components/Loader/Loader";
import PhotoSection from "../../components/MyProfile/PhotoSection/PhotoSection";
import EditUserForm from "../../components/EditUser/components/EditUserForm/EditUserForm";
import SkillsSection from "../../components/EditUser/components/SkillsSection/SkillsSection";
import Reputation from "../../components/EditUser/components/Reputation/Reputation";
import ProjectCard from "../../components/MyProfile/components/ProjectCard/ProjectCard";
import BreadCrumbs from "../../components/MyProfile/BreadCrumbs/BreadCrumbs";
import Layout from "../../components/EditUser/layouts/Layout";

function MyProfile() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    specialty_id: "",
    avatar_url: "",
    displaySkills: [],
  });

  const [dictionaries, setDictionaries] = useState({
    technologies: [],
    specialties: [],
  });

  const [projects, setProjects] = useState({
    active: [],
    completed: [],
  });

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const [user, techs, specs] = await Promise.all([
        getCurrentUser(),
        getTechnologies(),
        // getSpecialties(),
      ]);

      setDictionaries({ technologies: techs, specialties: specs });
      setProjects({
        active: user.active_projects || [],
        completed: user.completed_projects || [],
      });

      const displaySkills =
        user.skill_names?.map((name, idx) => {
          const foundTech = techs.find((t) => t.name === name);
          return foundTech
            ? { id: foundTech.id, name: foundTech.name }
            : { id: user.skill_ids?.[idx] || idx, name };
        }) || [];

      setFormData({
        email: user.email || "",
        specialty_id: user.specialty_id || "",
        avatar_url: user.avatar_url || "",
        displaySkills: displaySkills,
      });
    } catch (error) {
      console.error("Помилка завантаження профілю:", error);
      showToast("Не вдалося завантажити дані профілю.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const handleAvatarUpdate = (newUrl) => {
    setFormData((prev) => ({ ...prev, avatar_url: newUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      email: formData.email,
      specialty_id: formData.specialty_id
        ? Number(formData.specialty_id)
        : null,
      technology_ids: formData.displaySkills.map((s) => s.id),
      avatar_url: formData.avatar_url,
    };

    console.log(payload);

    try {
      await updateMyProfile(payload);
      showToast("Профіль успішно оновлено!");
    } catch (error) {
      console.error("Помилка оновлення профілю:", error);
      showToast("Не вдалося зберегти зміни.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <Loader message="Завантаження профілю..." />;

  return (
    <Layout>
      <div className={styles.container}>
        <BreadCrumbs />

        <form onSubmit={handleSubmit} className={styles.profileForm}>
          {/* Центрована секція фотографії */}
          <PhotoSection
            avatarUrl={formData.avatar_url}
            onAvatarChange={handleAvatarUpdate}
            isSaving={isSaving}
          />

          {/* Нижня частина форми: Розподіл на Ліве та Праве крило */}
          <div className={styles.infoColumns}>
            {/* Ліва колонка: Текстова інформація (Email, Спеціальність) */}
            <div className={styles.leftInfoCol}>
              <h2 className={styles.sectionTitle}>Особиста інформація</h2>
              <EditUserForm
                formData={formData}
                setFormData={setFormData}
                specialties={dictionaries.specialties}
              />
            </div>

            {/* Права колонка: Навички та Репутація */}
            <div className={styles.rightInfoCol}>
              <div className={styles.skillsWrapper}>
                <SkillsSection
                  allSkills={dictionaries.technologies}
                  selectedSkills={formData.displaySkills}
                  onChange={(newSkills) =>
                    setFormData({ ...formData, displaySkills: newSkills })
                  }
                />
              </div>

              <div className={styles.reputationWrapper}>
                <Reputation />
              </div>
            </div>
          </div>
        </form>

        {/* Нижня частина сторінки: Блоки проєктів залишаються поза тегом форми */}
        <div className={styles.projectsSection}>
          <h2 className={styles.projectsTitle}>Активні проєкти</h2>
          {projects.active.length > 0 ? (
            <div className={styles.projectsGrid}>
              {projects.active.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className={styles.noProjects}>Немає активних проєктів</p>
          )}

          <h2 className={styles.projectsTitle} style={{ marginTop: "40px" }}>
            Завершені проєкти
          </h2>
          {projects.completed.length > 0 ? (
            <div className={styles.projectsGrid}>
              {projects.completed.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className={styles.noProjects}>Немає завершених проєктів</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MyProfile;
