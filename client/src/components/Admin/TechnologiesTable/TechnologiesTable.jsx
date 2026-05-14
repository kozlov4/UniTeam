import React from "react";
import styles from "./TechnologiesTable.module.css";
import { Pencil, Trash2 } from "lucide-react";

function TechnologiesTable({ data, onEdit, onDelete }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва</th>
            <th style={{ textAlign: "center" }}>Дії</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className={styles.actions}>
                <button onClick={() => onEdit(item)} className={styles.editBtn}>
                  <Pencil size={22} />
                </button>
                <button
                  onClick={() => onDelete(item)}
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
}

export default TechnologiesTable;
