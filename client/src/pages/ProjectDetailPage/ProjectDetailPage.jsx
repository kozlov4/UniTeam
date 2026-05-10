import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, User } from "lucide-react";
import styles from "./ProjectDetailPage.module.css";
import { ProjectContent } from "../../components/ProjectDetails/ProjectContent";
import { ProjectSidebar } from "../../components/ProjectDetails/ProjectSidebar";
import { Breadcrumbs } from "../../components/ProjectDetails/Breadcrumbs";
import Logo from "../../components/Logo/Logo";
import { getProjectById } from "../../services/projects.service";
import { getCurrentUser } from "../../services/users.service";

export default function ProjectDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectData, userData] = await Promise.all([
          getProjectById(id),
          getCurrentUser(),
        ]);
        setProject(projectData);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch page data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>Завантаження деталей проєкту...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.error}>Проєкт не знайдено.</div>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>Назад</button>
      </div>
    );
  }

  const fullName = user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "Користувач";

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <Logo />
          <div className={styles.headerRight}>
            <div className={styles.profileArea}>
              <div 
                className={styles.user} 
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt="user" />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <User size={20} />
                  </div>
                )}
                <span>{fullName}</span>
              </div>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div 
                    className={styles.userDropdown}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                      <LogOut size={18} />
                      Вихід
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className={styles.closeBtn}
              onClick={() => navigate(-1)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className={styles.headerBottom}>
          <Breadcrumbs styles={styles} />
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.leftCol}>
            <ProjectContent styles={styles} project={project} currentUser={user} />
          </div>
          <div className={styles.rightCol}>
            <ProjectSidebar styles={styles} project={project} />
          </div>
        </div>
      </main>
    </div>
  );
}
