import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import styles from "./ProjectDetailPage.module.css";
import { ProjectContent } from "../../components/ProjectDetails/ProjectContent";
import { ProjectSidebar } from "../../components/ProjectDetails/ProjectSidebar";
import { Breadcrumbs } from "../../components/ProjectDetails/Breadcrumbs";
import Logo from "../../components/Logo/Logo";
import { getProjectById } from "../../services/projects.service";

export default function ProjectDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log("Fetching project with ID:", id);
        const data = await getProjectById(id);
        console.log("Project data received:", data);
        setProject(data);
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>Завантаження деталей проєкту...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.error}>Проєкт не знайдено.</div>
        <button onClick={() => navigate(-1)}>Назад</button>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Logo />
          <Breadcrumbs styles={styles} />
        </div>

        <div className={styles.headerRight}>
          <div className={styles.user}>
            <img src="/avatar1.jpg" alt="user" />
            <span>Павло Павленко</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => navigate(-1)}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.leftCol}>
            <ProjectContent styles={styles} project={project} />
          </div>
          <div className={styles.rightCol}>
            <ProjectSidebar styles={styles} project={project} />
          </div>
        </div>
      </main>
    </div>
  );
}
