import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, ShieldCheck, Trophy, Timer, ExternalLink, User } from "lucide-react";
import styles from "./ParticipantProfilePage.module.css";
import { getUserProfile } from "../../services/users.service";
import Logo from "../../components/Logo/Logo";
import { fadeUp, stagger } from "../../utils/animations";

const ParticipantProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(id);
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch participant profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProfile();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>Завантаження профілю...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.error}>Учасника не знайдено.</div>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>Назад</button>
      </div>
    );
  }

  const fullName = `${profile.first_name || ""} ${profile.last_name || ""}`.trim();

  // Mock achievements as they are not in the current API schema but present in design
  const achievements = [
    { id: 1, title: "Надійний партнер", icon: <ShieldCheck size={24} />, color: "#e3f2fd", iconColor: "#2196f3" },
    { id: 2, title: "Middle Python", icon: <Trophy size={24} />, color: "#fff9c4", iconColor: "#fbc02d" },
    { id: 3, title: "Король дедлайнів", icon: <Timer size={24} />, color: "#e8f5e9", iconColor: "#4caf50" },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <Logo />
        <button
          className={styles.closeBtn}
          onClick={() => navigate(-1)}
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </header>

      <main className={styles.container}>
        {/* Left Sidebar */}
        <motion.aside 
          className={styles.sidebar}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.profileCard}>
            <div className={styles.avatarWrapper}>
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={fullName} className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder}><User size={80} /></div>
              )}
            </div>
            <h1 className={styles.name}>{fullName}</h1>
            <p className={styles.specialty}>{profile.specialty_name || "Студент"}</p>
            
            <div className={styles.statsCard}>
              <span className={styles.statsLabel}>Проєкти</span>
              <span className={styles.statsValue}>{profile.completed_projects_count} завершені</span>
            </div>
          </div>

          <div className={styles.skillsCard}>
            <h3 className={styles.cardTitle}>Навички</h3>
            <div className={styles.skillsGrid}>
              {profile.skill_names.map((skill, index) => (
                <span key={index} className={styles.skillTag}>{skill}</span>
              ))}
            </div>
          </div>

          <button className={styles.messageBtn}>Написати</button>
        </motion.aside>

        {/* Right Main Content */}
        <motion.div 
          className={styles.mainContent}
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Achievements Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <ShieldCheck className={styles.sectionIcon} size={24} />
              <h2 className={styles.sectionTitle}>Репутація та досягнення</h2>
            </div>
            <div className={styles.achievementsGrid}>
              {achievements.map((ach) => (
                <motion.div 
                  key={ach.id} 
                  className={styles.achievementCard}
                  style={{ backgroundColor: ach.color }}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                >
                  <div className={styles.achIcon} style={{ color: ach.iconColor }}>{ach.icon}</div>
                  <span className={styles.achTitle}>{ach.title}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects Gallery Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIconWrapper}>⚡</div>
              <h2 className={styles.sectionTitle}>Галерея завершених проєктів</h2>
            </div>
            <div className={styles.projectsGrid}>
              {profile.completed_projects.map((project) => (
                <motion.div 
                  key={project.id} 
                  className={styles.projectCard}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                >
                  <div className={styles.projectImgWrapper}>
                    <img src={project.image_url || "/subj4.jpg"} alt={project.title} />
                  </div>
                  <div className={styles.projectBody}>
                    <span className={styles.projectCategory}>{project.category_name}</span>
                    <h4 className={styles.projectTitle}>{project.title}</h4>
                    <p className={styles.projectDesc}>{project.description}</p>
                    
                    <div className={styles.projectMeta}>
                      <span className={styles.metaItem}>📅 {new Date(project.created_at).toLocaleDateString()}</span>
                      <span className={styles.metaItem}>🕒 3 місяці</span>
                    </div>

                    <div className={styles.projectFooter}>
                      <div className={styles.projectAvatars}>
                        {project.avatars.slice(0, 3).map((av, i) => (
                          <img key={i} src={av.avatar_url} alt="member" />
                        ))}
                        <span className={styles.participantsCount}>{project.participants_count} учасники</span>
                      </div>
                      <button className={styles.resultBtn}>
                        Результати проєкту <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default ParticipantProfilePage;
