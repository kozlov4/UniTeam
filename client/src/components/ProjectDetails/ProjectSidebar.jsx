import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animations";

export function ProjectSidebar({ styles, project }) {
  const { members = [], leader, technologies = [], image_url, title } = project;

  return (
    <motion.aside initial="hidden" animate="visible" variants={fadeUp} className={styles.rightContent}>
      <div className={styles.heroImageWrapper}>
        <img 
          src={image_url || "/subj4.jpg"} 
          alt={title} 
          className={styles.projectHeroImage} 
        />
      </div>

      {technologies.length > 0 && (
        <div className={styles.rightSectionBlock}>
          <h3 className={styles.rightSectionTitle}>Основні технології</h3>
          <div className={styles.techTagsGrid}>
            {technologies.map((tech) => (
              <span key={tech.id} className={styles.techTagItem}>
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={styles.rightSectionBlock}>
        <h3 className={styles.rightSectionTitle}>Учасники</h3>
        <div className={styles.membersGrid}>
          {members.map((member) => (
            <div key={member.id} className={styles.memberSmallItem}>
              <img
                src={member.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`}
                alt={member.first_name}
                className={styles.memberSmallAvatar}
              />
              <span className={styles.memberSmallName}>
                {member.first_name} {member.last_name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {leader && (
        <div className={styles.rightSectionBlock}>
          <h3 className={styles.rightSectionTitle}>Лідер команди</h3>
          <div className={styles.memberSmallItem}>
            <img
              src={leader.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${leader.id}`}
              alt="Leader"
              className={styles.memberSmallAvatar}
            />
            <span className={styles.memberSmallName}>
              {leader.first_name} {leader.last_name}
            </span>
          </div>
        </div>
      )}
    </motion.aside>
  );
}
