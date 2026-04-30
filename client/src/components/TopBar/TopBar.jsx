import React from 'react';
import styles from './TopBar.module.css';

const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="text" placeholder="IoT" className={styles.searchInput} />
        </div>
      </div>

      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Павло Павленко</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
