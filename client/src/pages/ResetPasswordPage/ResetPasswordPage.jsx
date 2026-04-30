import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './ResetPasswordPage.module.css';

function ResetPasswordPage() {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    
    if (formData.password.length < 8) {
      newErrors.password = "Пароль має містити мінімум 8 символів";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    //TODO: API запиту
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1000);
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
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Код з листа</label>
            <div className={styles.codeGrid}>
              {[...Array(6)].map((_, i) => (
                <input 
                  key={i} 
                  type="text" 
                  maxLength="1" 
                  className={styles.codeInput}
                  placeholder="0"
                />
              ))}
            </div>
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
    </AuthLayout>
  );
}

export default ResetPasswordPage;
