// ProjectsTable.jsx
import React from "react";
import styles from "./ProjectsTable.module.css";
import { Pencil, Trash2 } from "lucide-react";

const ProjectsTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Опис</th>
            <th>Учасники</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {data.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.participants_count}</td>
              <td>
                <span className={styles.statusBadge}>{project.status}</span>
              </td>
              <td className={styles.actions}>
                <button
                  onClick={() => onEdit(project)}
                  className={styles.editBtn}
                >
                  <Pencil size={22} />
                </button>
                <button
                  onClick={() => onDelete(project)}
                  className={styles.deleteBtn}
                >
                  <Trash2 size={22} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
