import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout/MainLayout';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import { getProjects, getCategories, getTechnologies } from '../../services/projects.service';
import styles from './ProjectsPage.module.css';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    tech: []
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [cats, techs] = await Promise.all([
          getCategories(),
          getTechnologies()
        ]);
        setCategories(cats);
        setTechnologies(techs);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const params = {};
        if (selectedFilters.category.length > 0) {
          params.category_id = selectedFilters.category[0]; // Assuming single category for now as per simple API
        }
        if (selectedFilters.tech.length > 0) {
          params.skill_ids = selectedFilters.tech;
        }
        
        const data = await getProjects(params);
        setProjects(Array.isArray(data) ? data : data?.items || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [selectedFilters]);

  const handleFilterChange = (sectionId, values) => {
    setSelectedFilters(prev => ({
      ...prev,
      [sectionId]: values
    }));
  };

  const filterSections = [
    {
      id: 'category',
      title: 'Категорії',
      options: categories.map(c => ({ id: c.id, name: c.name }))
    },
    {
      id: 'tech',
      title: 'Технології',
      options: technologies.map(t => ({ id: t.id, name: t.name }))
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

        <FilterPanel 
          sections={filterSections} 
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;
