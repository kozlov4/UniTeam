import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout/MainLayout';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import { getProjects, getCategories, getTechnologies, getVacancies } from '../../services/projects.service';
import styles from './ProjectsPage.module.css';
import { ChevronDown } from 'lucide-react';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    tech: [],
    vacancy: [],
    min_members: null,
    max_members: null
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [cats, techs, vacs] = await Promise.all([
          getCategories(),
          getTechnologies(),
          getVacancies()
        ]);
        setCategories(Array.isArray(cats) ? cats : cats?.items || []);
        setTechnologies(Array.isArray(techs) ? techs : techs?.items || []);
        setVacancies(Array.isArray(vacs) ? vacs : vacs?.items || []);
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
        const params = {
          sort_by: sortBy,
          search: searchQuery || undefined,
          min_members: selectedFilters.min_members || undefined,
          max_members: selectedFilters.max_members || undefined
        };
        
        if (selectedFilters.category.length > 0) {
          params.category_ids = selectedFilters.category;
        }
        if (selectedFilters.tech.length > 0) {
          params.tech_ids = selectedFilters.tech;
        }
        if (selectedFilters.vacancy.length > 0) {
          params.roles = selectedFilters.vacancy;
        }
        
        const data = await getProjects(params);
        setProjects(Array.isArray(data) ? data : data?.items || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchProjects();
    }, 400); // Debounce search

    return () => clearTimeout(timer);
  }, [selectedFilters, searchQuery, sortBy]);

  const handleFilterChange = (sectionId, values) => {
    setSelectedFilters(prev => ({
      ...prev,
      [sectionId]: values
    }));
  };

  const handleRangeChange = (min, max) => {
    setSelectedFilters(prev => ({
      ...prev,
      min_members: min,
      max_members: max
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
    },
    {
      id: 'vacancy',
      title: 'Вакансії',
      options: vacancies.map(v => ({ id: v.id, name: v.name }))
    }
  ];

  return (
    <MainLayout 
      searchQuery={searchQuery} 
      onSearchChange={setSearchQuery}
    >
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>Усі проєкти</h1>
            <div className={styles.controls}>
              <div className={styles.sortWrapper}>
                <select 
                  className={styles.sortSelect} 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Найновіші</option>
                  <option value="lowest">Старіші</option>
                </select>
                <ChevronDown size={16} className={styles.sortChevron} />
              </div>
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
          onRangeChange={handleRangeChange}
          showMembersFilter={true}
        />
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;
