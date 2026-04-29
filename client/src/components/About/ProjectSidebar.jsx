import { motion } from "framer-motion";
import { technologies, members } from "./aboutData";

export function ProjectSidebar({ styles }) {
  return (
    <motion.aside
      className={styles.right}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src="/subj4.jpg"
        alt="project"
        className={styles.projectImage}
        whileHover={{ scale: 1.04 }}
      />

      <motion.div className={styles.infoBlock} whileHover={{ y: -5 }}>
        <h3>Основні технології</h3>

        <div className={styles.techList}>
          {technologies.map((tech) => (
            <motion.span key={tech} whileHover={{ scale: 1.08 }}>
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div className={styles.infoBlock} whileHover={{ y: -5 }}>
        <h3>Учасники</h3>

        <div className={styles.members}>
          {members.map((member) => (
            <motion.div className={styles.member} key={member.id} whileHover={{ x: 5 }}>
              <img src={member.avatar} alt={member.name} />
              <span>{member.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className={styles.infoBlock} whileHover={{ y: -5 }}>
        <h3>Лідер команди</h3>

        <motion.div className={styles.member} whileHover={{ x: 5 }}>
          <img src="/avatar1.jpg" alt="leader" />
          <span>Анастасія Мельник</span>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
}