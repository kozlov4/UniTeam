import React from "react";
import { Link } from "react-router";
import { X } from "lucide-react";
import styles from "./NotificationModal.module.css";

const NotificationModal = ({
  isOpen,
  onClose,
  image,
  title,
  description = "",
  buttonText = "",
  buttonPath = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.content}>
          {image && (
            <div className={styles.iconContainer}>
              <img src={image} className={styles.mainIcon} />
            </div>
          )}

          <h2 className={styles.title}>{title}</h2>

          {description && <p className={styles.description}>{description}</p>}

          {buttonText && buttonPath && (
            <div className={styles.btnContainer}>
              <Link
                to={buttonPath}
                className={styles.linkBtn}
                onClick={onClose}
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
