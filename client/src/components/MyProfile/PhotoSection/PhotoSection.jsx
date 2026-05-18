import React, { useRef, useState } from "react";
import styles from "./PhotoSection.module.css";
import { uploadImage } from "../../../services/upload.service";
import default_avatar from "../../../assets/images/default_profile.png";

function PhotoSection({ avatarUrl, onAvatarChange, isSaving }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Будь ласка, оберіть зображення");
      return;
    }

    try {
      setIsUploading(true);
      const data = await uploadImage(file);
      console.log(data);

      const uploadedUrl = data.image_url;
      onAvatarChange(uploadedUrl);
    } catch (error) {
      console.error("Помилка завантаження фото:", error);
      alert("Не вдалося завантажити фото. Спробуйте ще раз.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.photoSection}>
      <div className={styles.avatarWrapper}>
        <img
          src={avatarUrl || default_avatar}
          alt="Profile avatar"
          className={styles.avatarImage}
        />
      </div>

      <span className={styles.title}>Ваше фото</span>
      <p className={styles.subtitle}>Буде відображатися у вас у профілі</p>

      <div className={styles.actions}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className={styles.hiddenInput}
        />
        <button
          type="button"
          className={styles.uploadBtn}
          onClick={handleButtonClick}
          disabled={isUploading || isSaving}
        >
          {isUploading ? "Завантаження..." : "Завантажити нове"}
        </button>

        {/* Кнопка відправки форми */}
        <button
          type="submit"
          className={styles.saveBtn}
          disabled={isUploading || isSaving}
        >
          {isSaving ? "Збереження..." : "Зберегти"}
        </button>
      </div>
    </div>
  );
}

export default PhotoSection;
