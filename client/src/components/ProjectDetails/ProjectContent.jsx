import React from "react";
import { motion } from "framer-motion";
import { Target, FileText } from "lucide-react";
import { fadeUp, stagger } from "../../utils/animations";

export function ProjectContent({ styles }) {
  const technologies = [
    "JavaScript",
    "React",
    "Chart.js",
    "Node.js",
    "PostgreSQL",
    "Google Maps API",
    "IoT",
  ];

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div className={styles.projectHero} variants={fadeUp}>
        <img src="/subj4.jpg" alt="AirMonitor" className={styles.heroImg} />
        <div className={styles.heroOverlay}>
          <span className={styles.heroTag}>Web-розробка</span>
          <h1 className={styles.heroTitle}>AirMonitor</h1>
        </div>
      </motion.div>

      {/* Goal Section */}
      <motion.div className={styles.infoSection} variants={fadeUp}>
        <h3 className={styles.sectionTitle}>
          <Target size={24} />
          Мета проєкту
        </h3>
        <p className={styles.sectionText}>
          Розробка програмної системи для моніторингу, аналізу та візуалізації
          показників якості повітря в реальному часі, що дозволить користувачам
          отримувати актуальну інформацію про стан довкілля, своєчасно реагувати
          на погіршення якості повітря та приймати обґрунтовані рішення для
          збереження здоров’я.
        </p>
      </motion.div>

      {/* Description Section */}
      <motion.div className={styles.infoSection} variants={fadeUp}>
        <h3 className={styles.sectionTitle}>
          <FileText size={24} />
          Опис проєкту
        </h3>
        <p className={styles.sectionText}>
          Програмна система призначена для збору даних із датчиків або відкритих
          API, що вимірюють показники якості повітря (рівень PM2.5, PM10, CO2,
          NO2 тощо)...
        </p>
      </motion.div>

      {/* Technologies Section */}
      <motion.div className={styles.techSection} variants={fadeUp}>
        <h3 className={styles.sidebarTitle}>Технології</h3>
        <div className={styles.techGrid}>
          {technologies.map((tech) => (
            <span key={tech} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
