import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../../components/MainLayout/MainLayout";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { fadeUp, staggerContainer } from "../../utils/animations";
import { getProjects, getSpecialtyProjects } from "../../services/projects.service";
import styles from "./StudentHomePage.module.css";

const StudentHomePage = () => {
  const navigate = useNavigate();
  const [newProjects, setNewProjects] = useState([]);
  const [suggestedProjects, setSuggestedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching dashboard data...");
        const [recentData, recommendedData] = await Promise.all([
          getProjects({ sort_by: "newest", limit: 5 }),
          getSpecialtyProjects(),
        ]);
        
        console.log("Recent projects response:", recentData);
        console.log("Specialty projects response:", recommendedData);

        const recent = Array.isArray(recentData) ? recentData : recentData?.items || [];
        const specialty = Array.isArray(recommendedData) ? recommendedData : recommendedData?.items || [];
        
        setNewProjects(recent);
        setSuggestedProjects(specialty);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.heroPattern}></div>
        <div className={styles.heroContent}>
          <motion.h1 className={styles.heroTitle} variants={fadeUp}>
            Зроби своє навчання кращим - знайди однодумців
          </motion.h1>
          <motion.button
            className={styles.createBtn}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/create")}
          >
            Створити проєкт +
          </motion.button>
        </div>
      </motion.section>

      <motion.section
        className={styles.section}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Нові проєкти</h2>
          <div className={styles.sliderControls}>
            <button className={styles.controlBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className={`${styles.controlBtn} ${styles.activeBtn}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        <div className={styles.projectsGrid}>
          {isLoading ? (
            <p>Завантаження...</p>
          ) : newProjects.length > 0 ? (
            newProjects.map(p => <ProjectCard key={p.id} project={p} />)
          ) : (
            <p>Немає нових проєктів</p>
          )}
        </div>
      </motion.section>

      <motion.section
        className={styles.section}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Проєкти пов'язані з Вашою спеціальністю/факультетом</h2>
          <div className={styles.sliderControls}>
            <button className={styles.controlBtn}>
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className={`${styles.controlBtn} ${styles.activeBtn}`}>
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        <div className={styles.projectsGrid}>
          {isLoading ? (
            <p>Завантаження...</p>
          ) : suggestedProjects.length > 0 ? (
            suggestedProjects.map(p => <ProjectCard key={p.id} project={p} />)
          ) : (
            <p>Рекомендацій немає</p>
          )}
        </div>
      </motion.section>
    </MainLayout>
  );
};

export default StudentHomePage;
