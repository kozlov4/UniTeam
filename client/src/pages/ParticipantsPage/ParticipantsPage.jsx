import React from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import ParticipantCard from '../../components/ParticipantCard/ParticipantCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import styles from './ParticipantsPage.module.css';

const ParticipantsPage = () => {
  const participants = [
    { id: 1, name: 'Олег Олежко', description: 'Працює з JavaScript, React та Node.js, напрямок — веб-розробка.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { id: 2, name: 'Марія Петренко', description: 'Працює з JavaScript, React та Node.js, напрямок — веб-розробка.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { id: 3, name: 'Олена Коваленко', description: 'Працює з JavaScript, React та Node.js, напрямок — веб-розробка.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
    { id: 4, name: 'Іван Іванов', description: 'Використовує Python, Django та FastAPI, напрямок — backend-розробка.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
    { id: 5, name: 'Петро Сидоренко', description: 'Використовує Python, Django та FastAPI, напрямок — backend-розробка.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
    { id: 6, name: 'Василь Васильєв', description: 'Використовує Python, Django та FastAPI, напрямок — backend-розробка.', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400' },
  ];

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
            {participants.map(p => <ParticipantCard key={p.id} participant={p} />)}
            {participants.map(p => <ParticipantCard key={p.id + 10} participant={p} />)}
          </div>
        </div>

        <FilterPanel sections={filterSections} variant="warm" />
      </div>
    </MainLayout>
  );
};

export default ParticipantsPage;
