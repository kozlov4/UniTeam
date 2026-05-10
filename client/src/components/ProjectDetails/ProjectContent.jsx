import React from "react";
import { motion } from "framer-motion";
import { Target, FileText } from "lucide-react";
import { fadeUp, stagger } from "../../utils/animations";

export function ProjectContent({ styles, project }) {
  // Use project data from backend, fallback to default for image if not provided
  const { title, goal, description, image_url, technologies = [] } = project;

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div className={styles.projectHero} variants={fadeUp}>
        <img 
          src={image_url || "/subj4.jpg"} 
          alt={title} 
          className={styles.heroImg} 
        />
        <div className={styles.heroOverlay}>
          <span className={styles.heroTag}>{project.category?.name || "Проєкт"}</span>
          <h1 className={styles.heroTitle}>{title}</h1>
        </div>
      </motion.div>

      {/* Goal Section */}
      <motion.div className={styles.infoSection} variants={fadeUp}>
        <h3 className={styles.sectionTitle}>
          <Target size={24} />
          Мета проєкту
        </h3>
        <p className={styles.sectionText}>{goal}</p>
      </motion.div>

      {/* Description Section */}
      <motion.div className={styles.infoSection} variants={fadeUp}>
        <h3 className={styles.sectionTitle}>
          <FileText size={24} />
          Опис проєкту
        </h3>
        <p className={styles.sectionText}>{description}</p>
      </motion.div>

      {/* Technologies Section */}
      {technologies.length > 0 && (
        <motion.div className={styles.techSection} variants={fadeUp}>
          <h3 className={styles.sidebarTitle}>Технології</h3>
          <div className={styles.techGrid}>
            {technologies.map((tech) => (
              <span key={tech.id} className={styles.techTag}>
                {tech.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
