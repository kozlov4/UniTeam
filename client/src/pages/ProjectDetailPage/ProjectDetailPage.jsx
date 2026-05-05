import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import styles from "./ProjectDetailPage.module.css";
import { ProjectContent } from "../../components/ProjectDetails/ProjectContent";
import { ProjectSidebar } from "../../components/ProjectDetails/ProjectSidebar";
import { Breadcrumbs } from "../../components/ProjectDetails/Breadcrumbs";
import Logo from "../../components/Logo/Logo";

export default function ProjectDetailPage() {
  const navigate = useNavigate();

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
            <ProjectContent styles={styles} />
          </div>
          <div className={styles.rightCol}>
            <ProjectSidebar styles={styles} />
          </div>
        </div>
      </main>
    </div>
  );
}
