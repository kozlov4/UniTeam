import React, { useState, useEffect } from "react";
import styles from "./TeamMembersSection.module.css";
import { Trash } from "lucide-react";

function TeamMembersSection({ formData, setFormData }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // TODO: Замінити на отримання користувачів
    setAllUsers([
      { id: 1, name: "Іван", surname: "Петренко" },
      { id: 2, name: "Марія", surname: "Коваленко" },
      { id: 3, name: "Петро", surname: "Сидоренко" },
      { id: 4, name: "Анна", surname: "Українська" },
      { id: 5, name: "Василь", surname: "Мазепа" },
    ]);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim()) {
      const results = allUsers.filter(
        (user) =>
          (user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.surname.toLowerCase().includes(value.toLowerCase())) &&
          !formData.teamMembers.some((member) => member.id === user.id),
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddMember = (user) => {
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, user],
    });
    setSearchInput("");
    setSearchResults([]);
  };

  const handleRemoveMember = (userId) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter(
        (member) => member.id !== userId,
      ),
    });
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Додати учасника</h3>

      {formData.teamMembers.map((member) => (
        <div key={member.id} className={styles.itemRow}>
          <span className={styles.itemText}>
            {member.name} {member.surname}
          </span>
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => handleRemoveMember(member.id)}
          >
            <Trash />
          </button>
        </div>
      ))}

      <div className={styles.searchWrapper}>
        <div className={styles.inputRow}>
          <input
            type="text"
            className={styles.input}
            placeholder="Введіть ім'я та прізвище"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>

        {searchResults.length > 0 && (
          <div className={styles.searchResults}>
            {searchResults.map((user) => (
              <button
                key={user.id}
                type="button"
                className={styles.searchResultItem}
                onClick={() => handleAddMember(user)}
              >
                {user.name} {user.surname}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamMembersSection;
