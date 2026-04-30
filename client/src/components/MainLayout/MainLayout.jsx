import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import TopBar from '../TopBar/TopBar';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <TopBar />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
