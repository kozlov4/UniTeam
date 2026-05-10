import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CalendarDays, ChevronDown, User, LogOut } from "lucide-react";
import { fadeUp, stagger } from "../../utils/animations";
import { getCurrentUser } from "../../services/users.service";
import styles from "./TopBar.module.css";

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  
  const hideFilters = ["/dashboard", "/projects", "/participants"].includes(
    location.pathname,
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        showToast("Помилка при завантаженні даних користувача.", "error");
      }
    };
    fetchUser();
  }, []);

  const fullName = user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "Завантаження...";

  return (
    <motion.header
      className={styles.topBar}
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.searchContainer} variants={fadeUp}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Пошук"
            className={styles.searchInput}
          />
        </div>
      </motion.div>

      {!hideFilters && (
        <div className={styles.filters}>
          <motion.button className={styles.filterBtn} variants={fadeUp}>
            <CalendarDays size={18} />
            <span>Квітень</span>
            <ChevronDown size={18} />
          </motion.button>

          <motion.button className={styles.filterBtn} variants={fadeUp}>
            <span>Тип</span>
            <ChevronDown size={18} />
          </motion.button>
        </div>
      )}

      <div className={styles.profileWrapper}>
        <motion.div 
          className={styles.userProfile} 
          variants={fadeUp}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className={styles.userInfo}>
            <span className={styles.userName}>{fullName}</span>
          </div>
          <div className={styles.avatar}>
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt="User Avatar" />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <User size={24} />
              </div>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {showMenu && (
            <motion.div 
              className={styles.dropdownMenu}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <LogOut size={18} />
                Вихід
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default TopBar;
