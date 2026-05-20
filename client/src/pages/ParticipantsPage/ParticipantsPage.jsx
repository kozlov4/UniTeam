import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import ParticipantCard from '../../components/ParticipantCard/ParticipantCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import { getUsers, getSpecialties } from '../../services/users.service';
import { getTechnologies } from '../../services/projects.service';
import styles from './ParticipantsPage.module.css';

const ParticipantsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    tech: [],
    specialty: []
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [techs, specs] = await Promise.all([
          getTechnologies(),
          getSpecialties()
        ]);
        setTechnologies(Array.isArray(techs) ? techs : techs?.items || []);
        setSpecialties(Array.isArray(specs) ? specs : specs?.items || []);
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
        const params = {
          search: searchQuery || undefined
        };
        
        if (selectedFilters.tech.length > 0) {
          params.skill_ids = selectedFilters.tech;
        }
        if (selectedFilters.specialty.length > 0) {
          params.specialty_ids = selectedFilters.specialty;
        }

        const data = await getUsers(params);
        setParticipants(Array.isArray(data) ? data : data?.items || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(timer);
  }, [selectedFilters, searchQuery]);

  const handleFilterChange = (sectionId, values) => {
    setSelectedFilters(prev => ({
      ...prev,
      [sectionId]: values
    }));
  };

  const filterSections = [
    {
      id: 'specialty',
      title: 'Спеціальності',
      options: specialties.map(s => ({ id: s.id, name: s.name }))
    },
    {
      id: 'tech',
      title: 'Навички',
      options: technologies.map(t => ({ id: t.id, name: t.name }))
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
