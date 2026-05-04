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

  return (
    <div className={styles.uploadSection}>
      <div
        className={styles.uploadArea}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className={styles.uploadContent}>
          {formData.projectImage ? (
            <img
              src={URL.createObjectURL(formData.projectImage)}
              alt="preview"
              className={styles.previewImage}
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
        />
      </div>
    </div>
  );
}

export default ProjectImageUpload;
