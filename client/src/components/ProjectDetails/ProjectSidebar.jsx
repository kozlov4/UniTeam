import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animations";

export function ProjectSidebar({ styles }) {
  const teamMembers = Array(5).fill({
    name: "Анастасія Мельник",
    role: "Frontend developer",
    avatar: "/avatar4.jpg",
  });

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      <div className={styles.sidebarCard}>
        <h3 className={styles.sidebarTitle}>Команда (5)</h3>
        <div className={styles.teamList}>
          {teamMembers.map((member, i) => (
            <div key={i} className={styles.memberItem}>
              <img src={member.avatar} alt={member.name} className={styles.memberAvatar} />
              <div>
                <div className={styles.memberName}>{member.name}</div>
                <div className={styles.memberRole}>{member.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.leaderSection}>
          <h3 className={styles.sidebarTitle}>Лідер команди</h3>
          <div className={styles.memberItem}>
            <img src="/avatar4.jpg" alt="Leader" className={styles.memberAvatar} />
            <div className={styles.memberName}>Анастасія Мельник</div>
          </div>
        </div>

        <button className={styles.applyBtn}>Подати заявку</button>
      </div>

      <div className={styles.searchSection}>
        <h3 className={styles.sidebarTitle}>Шукаємо в команду</h3>
        <div className={styles.searchTags}>
          <div className={styles.searchTag}>Android-розробника</div>
          <div className={styles.searchTag}>Android-розробника</div>
        </div>
      </div>
    </motion.aside>
  );
}
