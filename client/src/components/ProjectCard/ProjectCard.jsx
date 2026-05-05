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
      onClick={() => navigate("/about")}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.imageContainer}>
        <img src={project.image} alt={project.title} />
      </div>
      <div className={styles.content}>
        <div className={styles.tag}>Програмна інженерія</div>
        <div className={styles.meta}>
          <div className={styles.avatars}>
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                  i + project.id * 7
                }`}
                alt="Avatar"
                className={styles.avatar}
              />
            ))}
          </div>
          <span className={styles.participantsCount}>5 учасників</span>
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <button className={styles.joinBtn}>Приєднатися</button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
