import React, { useState, useEffect } from "react";
import { getUsers } from "../../../../../services/users.service";
import UserCard from "./UserCard";
import styles from "./TeamMembersSection.module.css";

function TeamLeaderSection({ formData, setFormData }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.trim().length >= 1) {
        try {
          const params = {
            search: query,
            limit: 40,
            offset: 0,
          };
          const data = await getUsers(params);
          setResults(data);
          setShowDropdown(true);
        } catch (error) {
          console.error("Search error:", error);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const setLeader = (user) => {
    setFormData({
      ...formData,
      teamLeader: user,
    });
    setQuery("");
    setShowDropdown(false);
  };

  const removeLeader = () => {
    setFormData({
      ...formData,
      teamLeader: null,
    });
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Лідер команди</h3>

      <div className={styles.membersGrid}>
        {formData.teamLeader && (
          <UserCard user={formData.teamLeader} onRemove={removeLeader} />
        )}
      </div>

      {!formData.teamLeader && (
        <div className={styles.searchContainer}>
          <label className={styles.label}>Призначити лідера</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Пошук лідера..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />

          {showDropdown && results.length > 0 && (
            <div className={styles.dropdown}>
              {results.map((user) => (
                <div
                  key={user.id}
                  className={styles.dropdownItem}
                  onClick={() => setLeader(user)}
                >
                  <img
                    src={user?.avatar_url || "/default-avatar.png"}
                    alt="avatar"
                  />
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TeamLeaderSection;
