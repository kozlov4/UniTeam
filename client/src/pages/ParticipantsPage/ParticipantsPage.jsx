import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import ParticipantCard from '../../components/ParticipantCard/ParticipantCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import { getUsers } from '../../services/users.service';
import styles from './ParticipantsPage.module.css';

const ParticipantsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setParticipants(Array.isArray(data) ? data : data?.items || []);
      } catch (error) {
        
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
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
    },
    {
      title: 'Курс',
      options: ['1', '2', '3', '4', '5', '6']
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

        <FilterPanel sections={filterSections} variant="warm" />
      </div>
    </MainLayout>
  );
};

export default ParticipantsPage;
