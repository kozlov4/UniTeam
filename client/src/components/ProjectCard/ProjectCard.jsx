import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => navigate(`/projects/${project.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.imageContainer}>
        <img src={project.image_url || "https://picsum.photos/seed/uniteam/400/200"} alt={project.title} />
      </div>
      <div className={styles.content}>
        <div className={styles.tag}>{project.category_name || "Проєкт"}</div>
        <div className={styles.meta}>
          <div className={styles.avatars}>
            {project.avatars?.slice(0, 4).map((avatar) => (
              <img
                key={avatar.id}
                src={avatar.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar.id}`}
                alt="Avatar"
                className={styles.avatar}
              />
            ))}
          </div>
          <span className={styles.participantsCount}>{project.participants_count || 0} учасників</span>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.goal || project.description || "Опис відсутній"}</p>
        <button className={styles.joinBtn}>Приєднатися</button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

