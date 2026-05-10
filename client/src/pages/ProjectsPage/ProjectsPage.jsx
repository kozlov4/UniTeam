import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout/MainLayout';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import { getProjects } from '../../services/projects.service';
import styles from './ProjectsPage.module.css';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(Array.isArray(data) ? data : data?.items || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
              <button className={styles.createBtn} onClick={() => navigate("/create")}>Створити проєкт +</button>
            </div>
          </div>

          <div className={styles.grid}>
            {isLoading ? (
              <p>Завантаження...</p>
            ) : projects.length > 0 ? (
              projects.map(p => <ProjectCard key={p.id} project={p} />)
            ) : (
              <p>Проєктів не знайдено</p>
            )}
          </div>
        </div>

        <FilterPanel sections={filterSections} />
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;
