import React from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './StudentHomePage.module.css';

const StudentHomePage = () => {
  const newProjects = [
    { id: 1, title: 'Розробка програмної системи для перевезення вантажу', description: 'Розробка програмної системи для перевезення вантажу', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400' },
    { id: 2, title: 'Розробка програмної системи для перевезення вантажу', description: 'Розробка програмної системи для перевезення вантажу', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400' },
    { id: 3, title: 'Розробка програмної системи для перевезення вантажу', description: 'Розробка програмної системи для перевезення вантажу', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400' },
    { id: 4, title: 'Розробка програмної системи для перевезення вантажу', description: 'Розробка програмної системи для перевезення вантажу', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400' },
    { id: 5, title: 'Розробка програмної системи для перевезення вантажу', description: 'Розробка програмної системи для перевезення вантажу', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400' },
  ];

  const suggestedProjects = [
    { id: 6, title: 'Lorem ipsum tincidunt porttitor magna in ac dignissim sit nec.', description: 'Lorem ipsum proin lacus commodo tellus blandit porttitor.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
    { id: 7, title: 'Lorem ipsum proin lacus commodo tellus blandit porttitor.', description: 'Lorem ipsum proin lacus commodo tellus blandit porttitor.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400' },
    { id: 8, title: 'Lorem ipsum proin lacus commodo tellus blandit porttitor.', description: 'Lorem ipsum proin lacus commodo tellus blandit porttitor.', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400' },
    { id: 9, title: 'Lorem ipsum proin lacus commodo tellus blandit porttitor.', description: 'Lorem ipsum proin lacus commodo tellus blandit porttitor.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400' },
  ];

  return (
    <MainLayout>
      <section className={styles.hero}>
        <div className={styles.heroPattern}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Зроби своє навчання кращим - знайди однодумців</h1>
          <button className={styles.createBtn}>Створити проєкт +</button>
        </div>
      </section>

      <section className={styles.section}>
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
          {newProjects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      <section className={styles.section}>
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
          {suggestedProjects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>
    </MainLayout>
  );
};

export default StudentHomePage;
