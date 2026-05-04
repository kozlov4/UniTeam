import React from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import styles from './ProjectsPage.module.css';

const ProjectsPage = () => {
  const projects = Array(12).fill(0).map((_, i) => ({
    id: i,
    title: 'Lorem ipsum tincidunt porttitor magna in ac dignissim sit nec.',
    description: 'Lorem ipsum proin lacus commodo tellus blandit porttitor.',
    image: `https://picsum.photos/seed/${i + 20}/400/200`,
  }));

  const filterSections = [
    {
      title: 'Факультети',
      options: ['Комп’ютерні науки', 'Комп’ютерна інженерія та інформаційні технології', 'Автоматизація, комп’ютерно-інтегрованих технологій та систем', 'Інформаційно-аналітичні технології та менеджмент']
    },
    {
      title: 'Спеціальності',
      options: ['Прикладна математика', 'Інженерія програмного забезпечення', 'Комп’ютерні науки', 'Системний аналіз та науки про дані', 'Кібербезпека та захист інформації']
    },
    {
      title: 'Навички',
      options: ['Python', 'UI / UX Design', 'JavaScript', 'Data Science', 'IoT']
    }
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>Усі проєкти</h1>
            <div className={styles.controls}>
              <select className={styles.sortSelect}>
                <option>Найновіші</option>
              </select>
              <button className={styles.createBtn}>Створити проєкт +</button>
            </div>
          </div>

          <div className={styles.grid}>
            {projects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>

        <FilterPanel sections={filterSections} />
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;
