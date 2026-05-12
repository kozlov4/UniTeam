import React, { useState, useEffect } from "react";
import styles from "./StudentsPage.module.css";
import { deleteUser, getUsers } from "../../../services/admin.service";
import AdminLayout from "../../../components/Admin/AdminLayout/AdminLayout";
import InputSearch from "../../../components/Admin/components/InputSearch/InputSearch";
import StudentsTable from "../../../components/Admin/Students/StudentsTable/StudentsTable";
import Loader from "../../../components/Loader/Loader";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

function StudentsPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchUsers = async (search) => {
    setIsLoading(true);
    try {
      const data = await getUsers(search);
      setUsers(data);
    } catch (error) {
      console.error("Помилка завантаження користувачів:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleEdit = (user) => {
    console.log("Редагувати користувача:", user);
  };

  const openDeleteModal = (tech) => {
    setSelectedStudent(tech);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedStudent) return;

    try {
      await deleteUser(selectedStudent.id);
      setIsModalOpen(false);
      setSelectedStudent(null);
      fetchUsers(searchTerm);
    } catch (error) {
      console.error("Помилка при видаленні:", error);
    }
  };

  return (
    <AdminLayout>
      <h1 className={styles.title}>Управління користувачами</h1>

      <div className={styles.toolbar}>
        <InputSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Введіть ім'я або email"
        />
      </div>
      {isLoading ? (
        <Loader message="Завантаження користувачів" />
      ) : (
        <StudentsTable
          data={users}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />
      )}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={confirmDelete}
        title={`Ви впевнені, що хочете видалити студента "${selectedStudent?.email}"?`}
      />
    </AdminLayout>
  );
}

export default StudentsPage;
