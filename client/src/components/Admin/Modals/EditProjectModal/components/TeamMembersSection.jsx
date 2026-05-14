import React, { useState, useEffect } from "react";
import { getUsers } from "../../../../../services/users.service";
import UserCard from "./UserCard";
import styles from "./TeamMembersSection.module.css";

function TeamMembersSection({ formData, setFormData }) {
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

  const addMember = (user) => {
    if (!formData.teamMembers.some((m) => m.id === user.id)) {
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, user],
      });
    }
    setQuery("");
    setShowDropdown(false);
  };

  const removeMember = (userId) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((m) => m.id !== userId),
    });
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Учасники</h3>

      <div className={styles.membersGrid}>
        {formData.teamMembers.map((member) => (
          <UserCard key={member.id} user={member} onRemove={removeMember} />
        ))}
      </div>

      <div className={styles.searchContainer}>
        <label className={styles.label}>Додати учасників</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Введіть ім'я або прізвище"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {showDropdown && results.length > 0 && (
          <div className={styles.dropdown}>
            {results.map((user) => (
              <div
                key={user.id}
                className={styles.dropdownItem}
                onClick={() => addMember(user)}
              >
                <img src={user?.avatar_url} alt="avatar" />
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamMembersSection;
