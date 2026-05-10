import React, { useState, useEffect } from "react";
import styles from "./TeamMembersSection.module.css";
import { Trash } from "lucide-react";
import { getUsers } from "../../../services/users.service";

function TeamMembersSection({ formData, setFormData }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers({ limit: 100 });
        setAllUsers(Array.isArray(data) ? data : data?.items || []);
      } catch (error) {
        console.error("Failed to fetch users for project creation:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim()) {
      const results = allUsers.filter((user) => {
        const fullName = `${user.first_name || ""} ${user.last_name || ""}`.toLowerCase();
        return (
          fullName.includes(value.toLowerCase()) &&
          !formData.teamMembers.some((member) => member.id === user.id)
        );
      });
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
      <h3 className={styles.title}>Додати учасників</h3>

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
                {user.first_name} {user.last_name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.tags}>
        {formData.teamMembers.map((member) => (
          <div key={member.id} className={styles.tag}>
            {member.first_name} {member.last_name}
            <button type="button" onClick={() => handleRemoveMember(member.id)}>
              <Trash size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamMembersSection;
