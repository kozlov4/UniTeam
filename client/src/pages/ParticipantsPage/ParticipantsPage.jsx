import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import ParticipantCard from '../../components/ParticipantCard/ParticipantCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import { getUsers } from '../../services/users.service';
import { getTechnologies } from '../../services/projects.service';
import styles from './ParticipantsPage.module.css';

const ParticipantsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    tech: [],
    course: []
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const techs = await getTechnologies();
        setTechnologies(techs);
      } catch (error) {
        console.error("Failed to fetch user filters:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const params = {};
        if (selectedFilters.tech.length > 0) {
          params.skill_ids = selectedFilters.tech;
        }
        if (selectedFilters.course.length > 0) {
          params.course_year = selectedFilters.course[0];
        }

        const data = await getUsers(params);
        setParticipants(Array.isArray(data) ? data : data?.items || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [selectedFilters]);

  const handleFilterChange = (sectionId, values) => {
    setSelectedFilters(prev => ({
      ...prev,
      [sectionId]: values
    }));
  };

  const filterSections = [
    {
      id: 'tech',
      title: 'Навички',
      options: technologies.map(t => ({ id: t.id, name: t.name }))
    },
    {
      id: 'course',
      title: 'Курс',
      options: [
        { id: 1, name: '1 курс' },
        { id: 2, name: '2 курс' },
        { id: 3, name: '3 курс' },
        { id: 4, name: '4 курс' },
        { id: 5, name: '5 курс' },
        { id: 6, name: '6 курс' }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>Усі учасники</h1>
          </div>

          <div className={styles.grid}>
            {isLoading ? (
              <p>Завантаження...</p>
            ) : participants.length > 0 ? (
              participants.map(p => <ParticipantCard key={p.id} participant={p} />)
            ) : (
              <p>Учасників не знайдено</p>
            )}
          </div>
        </div>

        <FilterPanel 
          sections={filterSections} 
          variant="warm" 
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>
    </MainLayout>
  );
};

export default ParticipantsPage;
