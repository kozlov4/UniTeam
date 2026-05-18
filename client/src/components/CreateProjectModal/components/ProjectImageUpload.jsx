import React, { useRef } from "react";
import styles from "./ProjectImageUpload.module.css";
import ic_addImage from "../../../assets/icons/ic_addImage.svg";

function ProjectImageUpload({ formData, setFormData }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData({
        ...formData,
        projectImage: e.target.files[0],
      });
    }
  };

  let imagePreview = null;

  if (formData.projectImage) {
    if (formData.projectImage instanceof File) {
      imagePreview = URL.createObjectURL(formData.projectImage);
    } else {
      imagePreview = formData.projectImage;
    }
  }

  return (
    <div className={styles.uploadSection}>
      <div
        className={styles.uploadArea}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className={styles.uploadContent}>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="preview"
              className={styles.previewImage}
              // Важливо для об'єктів File: звільняємо пам'ять після завантаження картинки
              onLoad={() => {
                if (formData.projectImage instanceof File) {
                  URL.revokeObjectURL(imagePreview);
                }
              }}
            />
          ) : (
            <>
              <img src={ic_addImage} alt="icon add image" />
              <p className={styles.uploadText}>
                Оберіть та завантажте фото з комп'ютера
              </p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}

export default ProjectImageUpload;
