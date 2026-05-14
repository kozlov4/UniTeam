import React from "react";
import styles from "./StudentsTable.module.css";
import { Pencil, Trash2 } from "lucide-react";

const StudentsTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Ім'я</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr
              key={user.id}
              className={user.is_blocked ? styles.blokced : null}
            >
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.is_blocked ? "Заблокований" : "Активний"}</td>
              <td>
                <div className={styles.dvActions}>
                  <button
                    onClick={() => onEdit(user)}
                    className={styles.editBtn}
                  >
                    <Pencil size={22} />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className={styles.deleteBtn}
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
