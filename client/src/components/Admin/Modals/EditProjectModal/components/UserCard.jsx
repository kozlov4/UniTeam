import React from "react";
import { X } from "lucide-react";
import styles from "./UserCard.module.css";

function UserCard({ user, onRemove, showRemove = true }) {
  if (!user) return null;

  return (
    <div className={styles.card}>
      <img
        src={user.avatar_url || "/default-avatar.png"}
        alt="avatar"
        className={styles.avatar}
      />
      <span className={styles.name}>
        {user.first_name} {user.last_name}
      </span>
      {showRemove && (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={() => onRemove(user.id)}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export default UserCard;
