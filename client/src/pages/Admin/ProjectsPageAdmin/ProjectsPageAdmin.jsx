import React, { useEffect, useState } from "react";
import styles from "./ProjectsPage.module.css";
import AdminLayout from "../../../components/Admin/AdminLayout/AdminLayout";
import { deleteProject, getProjects } from "../../../services/admin.service";
import InputSearch from "../../../components/Admin/components/InputSearch/InputSearch";
import ProjectsTable from "../../../components/Admin/Projects/ProjectsTable/ProjectsTable";
import Loader from "../../../components/Loader/Loader";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import EditProjectModal from "../../../components/Admin/Modals/EditProjectModal/EditProjectModal";

function ProjectsPageAdmin() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async (search) => {
    setIsLoading(true);
    try {
      const data = await getProjects(search);
      setProjects(data);
    } catch (error) {
      console.error("Помилка завантаження проектів:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProjects(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsModalEditOpen(true);
  };

  const openDeleteModal = (tech) => {
    setSelectedProject(tech);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProject) return;

    try {
      await deleteProject(selectedProject.id);
      setIsModalOpen(false);
      setSelectedProject(null);
      fetchProjects(searchTerm);
    } catch (error) {
      console.error("Помилка при видаленні:", error);
    }
  };
  return (
    <AdminLayout>
      <h1 className={styles.title}>Управління проєктами</h1>

      <div className={styles.toolbar}>
        <InputSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Назва проєкту"
        />
      </div>
      {isLoading ? (
        <Loader message="Завантаження проектів" />
      ) : (
        <ProjectsTable
          data={projects}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />
      )}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={confirmDelete}
        title={`Ви впевнені, що хочете видалити проект "${selectedProject?.title}"?`}
      />

      <EditProjectModal
        isOpen={isModalEditOpen}
        projectId={selectedProject?.id}
        onClose={() => setIsModalEditOpen(false)}
      />
    </AdminLayout>
  );
}

export default ProjectsPageAdmin;
