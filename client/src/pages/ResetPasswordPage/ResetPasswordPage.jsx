import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './ResetPasswordPage.module.css';
import { resetPassword } from '../../services/resetPassword.service';
import imageModal from "../../assets/images/image_modal_success.png";
import NotificationModal from '../../components/NotificationModal/NotificationModal';

function ResetPasswordPage() {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [code, setCode] = useState(new Array(6).fill(""));

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("temp_email");
  console.log(userEmail)

  const inputRefs = useRef([]);

  const handleCodeChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newCode = [...code];

    newCode[index] = element.value;

    setCode(newCode);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    
    if (formData.password.length < 8) {
      newErrors.password = "Пароль має містити мінімум 8 символів";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають";
    }
    if (code.join("").length < 6) newErrors.code = "Введіть повний код";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {

      await resetPassword({
        email: userEmail,
        code: code.join(""),
        new_password: formData.password,
      });

      setIsSuccessModalOpen(true);
      localStorage.removeItem("temp_email")
    } catch (error) {
      setErrors({
        server: error.response?.data?.message || "Помилка при зміні пароля",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <AuthLayout>
      <section className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconCircle}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.5-2.5" />
            </svg>
          </div>
          <h1 className={styles.title}>Створіть новий пароль</h1>
          <p className={styles.subtitle}>Ми відправили 6-значний код на user@email.com</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
           {errors.server && (
            <p className={styles.error}>{errors.server}</p>
          )}
          <div className={styles.formGroup}>
            <label className={styles.label}>Код з листа</label>
            <div className={styles.codeGrid}>
              {code.map((data, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[i] = el)}
                  value={data}
                  onChange={(e) => handleCodeChange(e.target, i)}
                  onFocus={(e) => e.target.select()}
                  className={`${styles.codeInput} ${errors.code ? styles.inputError : ""}`}
                  placeholder="0"
                />
              ))}
            </div>
            {errors.code && <p className={styles.error}>{errors.code}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Новий пароль</label>
            <Input
              onChange={handleChange}
              value={formData.password}
              name="password"
              type="password"
              placeholder="Пароль"
              error={errors.password}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Повторіть новий пароль</label>
            <Input
              onChange={handleChange}
              value={formData.confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Пароль"
              error={errors.confirmPassword}
            />
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
          </div>

          <div className={styles.submitWrapper}>
            <Button type="submit" fullWidth isDisabled={isLoading}>
              {isLoading ? "Оновлення..." : "Змінити пароль"}
            </Button>
          </div>
        </form>

        <div className={styles.links}>
          <Link to="/login" className={styles.backLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            Повернутися до сторінки авторизації
          </Link>
        </div>
      </section>

      <NotificationModal
        isOpen={isSuccessModalOpen}
        onClose={() => navigate("/login")}
        image={imageModal}
        title="Пароль успішно змінено"
        description="Тепер ви можете увійти в систему з новим паролем."
        buttonText="Увійти"
        buttonPath="/login"
      />
    </AuthLayout>
  );
}

export default ResetPasswordPage;
