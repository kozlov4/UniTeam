import React, { useState, useEffect } from "react";
import styles from "./TechnologiesPage.module.css";
import icPlus from "../../../assets/icons/ic_plus.svg";
import {
  createTechnologies,
  deleteTechnology,
  getTechnologies,
} from "../../../services/admin.service";
import InputSearch from "../../../components/Admin/components/InputSearch/InputSearch";
import TechnologiesTable from "../../../components/Admin/TechnologiesTable/TechnologiesTable";
import AdminLayout from "../../../components/Admin/AdminLayout/AdminLayout";
import Loader from "../../../components/Loader/Loader";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

function TechnologiesPage() {
  const [techs, setTechs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTechName, setNewTechName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);

  const fetchTechs = async (search) => {
    setIsLoading(true);
    try {
      const data = await getTechnologies(search);
      setTechs(data);
    } catch (error) {
      console.error("Помилка завантаження технологій:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTechs(searchTerm);
    }, 200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTechName.trim()) return;

    setIsCreating(true);
    try {
      await createTechnologies(newTechName);
      setNewTechName("");
      fetchTechs(searchTerm);
    } catch (error) {
      console.error("Помилка створення:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleEdit = (item) => console.log("Edit:", item);

  const openDeleteModal = (tech) => {
    setSelectedTech(tech);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTech) return;

    try {
      await deleteTechnology(selectedTech.id);
      setIsModalOpen(false);
      setSelectedTech(null);
      fetchTechs(searchTerm);
    } catch (error) {
      console.error("Помилка при видаленні:", error);
    }
  };

  return (
    <AdminLayout>
      <h1 className={styles.title}>Довідник технологій</h1>
      <h2 className={styles.subtitle}>Додати назву навички</h2>

      <form className={styles.createSection} onSubmit={handleCreate}>
        <input
          type="text"
          className={styles.createInput}
          placeholder="Назва нової категорії"
          value={newTechName}
          onChange={(e) => setNewTechName(e.target.value)}
          disabled={isCreating}
        />
        <button type="submit" className={styles.addBtn} disabled={isCreating}>
          <img src={icPlus} alt="Add" />
        </button>
      </form>

      <div className={styles.toolbar}>
        <InputSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Пошук за назвою"
        />
      </div>

      {isLoading ? (
        <Loader message="Оновлення списку..." />
      ) : (
        <TechnologiesTable
          data={techs}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />
      )}

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={confirmDelete}
        title={`Ви впевнені, що хочете видалити технологію "${selectedTech?.name}"?`}
      />
    </AdminLayout>
  );
}

export default TechnologiesPage;
