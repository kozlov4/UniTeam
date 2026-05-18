import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./LeaderCabinet.module.css";
import BreadCrumbs from "../../components/Applications/BreadCrumbs/BreadCrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../context/ToastContext";
import {
  completeProject,
  getApplications,
  respondeApplication,
} from "../../services/applications.service";
import default_avatar from "../../assets/images/default_profile.png";
import Layout from "../../components/EditUser/layouts/Layout";
import { ChevronDown, Check, Users, FileText, User } from "lucide-react";
import Loader from "../../components/Loader/Loader";
import { getProjectById } from "../../services/project.service";
function LeaderCabinet() {
  const { projectId } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [applications, setApplications] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const [expandedApp, setExpandedApp] = useState(null);

  const loadCabinetData = async () => {
    try {
      setLoading(true);
      const [apps, project] = await Promise.all([
        getApplications(projectId),
        getProjectById(projectId),
      ]);

      setProjectData(project);
      setApplications(
        apps.filter(
          (app) => app.status === "pending" || app.status === "string",
        ),
      );
    } catch (error) {
      console.error("Помилка завантаження кабінету лідера:", error);
      showToast("Не вдалося завантажити заявки проєкту.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) loadCabinetData();
  }, [projectId]);

  const toggleExpand = (id) => {
    setExpandedApp(expandedApp === id ? null : id);
  };

  const handleApplicationResponse = async (applicationId, action) => {
    try {
      setActionLoading(applicationId);
      await respondeApplication(projectId, applicationId, action);

      showToast(
        action === "accept" ? "Заявку успішно прийнято!" : "Заявку відхилено",
      );

      setApplications((prev) => prev.filter((app) => app.id !== applicationId));
    } catch (error) {
      console.error("Помилка відповіді на заявку:", error);
      showToast("Не вдалося обробити заявку.", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCompleteProject = async () => {
    try {
      await completeProject(projectId);
      showToast("Проєкт успішно позначено як завершений!");
    } catch (error) {
      console.error("Помилка завершення проєкту:", error);
      showToast("Не вдалося завершити проєкт.", "error");
    }
  };

  if (loading) return <Loader message="Завантаження кабінету лідера..." />;

  const teamMembers = projectData?.members || [];
  return (
    <Layout>
      <div className={styles.container}>
        {/* Хлібні крихти та Заголовок */}
        <div className={styles.headerRow}>
          <div>
            <div className={styles.breadcrumbs}>
              <BreadCrumbs />
            </div>
            <h1 className={styles.pageTitle}>Кабінет лідера</h1>
            <p className={styles.pageSubtitle}>
              Керуйте своєю командою та проєктом
            </p>
          </div>

          <button
            className={styles.completeBtn}
            onClick={handleCompleteProject}
          >
            <Check size={18} style={{ marginRight: "8px" }} /> Завершити проєкт
          </button>
        </div>

        {/* Динамічна назва проєкту з сервера */}
        <h2 className={styles.projectMainTitle}>
          {projectData?.title || "Проєкт"}
        </h2>

        {/* Двоколонковий макет */}
        <div className={styles.mainGrid}>
          {/* Ліва колонка: Заявки на вступ */}
          <div className={styles.leftColumn}>
            <h3 className={styles.sectionTitle}>
              <FileText
                size={20}
                style={{ marginRight: "10px", color: "#4A90E2" }}
              />
              Заявки на вступ ({applications.length})
            </h3>

            {applications.length === 0 ? (
              <div className={styles.emptyState}>
                Наразі немає нових заявок на вступ.
              </div>
            ) : (
              <div className={styles.applicationsList}>
                {applications.map((app) => {
                  const isExpanded = expandedApp === app.id;
                  const fullName = `${app.applicant?.first_name || ""} ${app.applicant?.last_name || ""}`;
                  const coverLetterText =
                    app.cover_letter || "Текст супровідного листа відсутній.";

                  return (
                    <div key={app.id} className={styles.appCard}>
                      <div className={styles.appCardHeader}>
                        <div className={styles.userInfo}>
                          <img
                            src={app.applicant?.avatar_url || default_avatar}
                            alt={fullName}
                            className={styles.avatar}
                          />
                          <div>
                            <h4 className={styles.userName}>{fullName}</h4>
                            <span className={styles.userEmail}>
                              {app.applicant?.email || ""}
                            </span>
                          </div>
                        </div>

                        <div className={styles.actions}>
                          <button
                            className={styles.rejectBtn}
                            onClick={() =>
                              handleApplicationResponse(app.id, "reject")
                            }
                            disabled={actionLoading === app.id}
                          >
                            Відхилити
                          </button>
                          <button
                            className={styles.acceptBtn}
                            onClick={() =>
                              handleApplicationResponse(app.id, "accept")
                            }
                            disabled={actionLoading === app.id}
                          >
                            Прийняти
                          </button>
                        </div>
                      </div>

                      {/* Текст супровідного листа + Завжди видимі дії профілю */}
                      <div className={styles.letterWrapper}>
                        <div
                          className={styles.letterToggle}
                          onClick={() => toggleExpand(app.id)}
                        >
                          {/* Якщо згорнуто — стилі уріжуть текст до одного рядка */}
                          <span
                            className={`${styles.letterQuote} ${!isExpanded ? styles.truncated : ""}`}
                          >
                            "{coverLetterText}"
                          </span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <ChevronDown size={20} className={styles.chevron} />
                          </motion.div>
                        </div>

                        {/* Кнопка профілю винесена окремо, тому вона видима завжди */}
                        <div className={styles.letterFooter}>
                          <button
                            className={styles.viewProfileLink}
                            onClick={() =>
                              navigate(`/participants/${app.applicant?.id}`)
                            }
                          >
                            <User size={16} style={{ marginRight: "6px" }} />
                            Переглянути профіль
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Права колонка: Ваша команда (Дані з бекенду) */}
          <div className={styles.rightColumn}>
            <div className={styles.teamCard}>
              <h3 className={styles.teamTitle}>
                <Users
                  size={18}
                  style={{ marginRight: "10px", color: "#4A90E2" }}
                />{" "}
                Ваша команда ({teamMembers.length})
              </h3>
              <div className={styles.teamList}>
                {teamMembers.length === 0 ? (
                  <p className={styles.noMembers}>
                    У проєкті поки немає учасників
                  </p>
                ) : (
                  teamMembers.map((member) => {
                    const memberName = `${member.first_name || ""} ${member.last_name || ""}`;
                    return (
                      <div key={member.id} className={styles.teamMember}>
                        <img
                          src={member.avatar_url || default_avatar}
                          alt={memberName}
                          className={styles.miniAvatar}
                        />
                        <span className={styles.memberName}>{memberName}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LeaderCabinet;
