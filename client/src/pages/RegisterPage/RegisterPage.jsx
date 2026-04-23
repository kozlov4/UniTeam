import React from "react";
import { Link } from "react-router";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./RegisterPage.module.css";
import Checkbox from "../../components/Checkbox/Checkbox";
import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validators";

function RegisterPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailErr = validateEmail(formData.email);
    const passwordErr = validatePassword(formData.password);

    if (emailErr || passwordErr) {
      setErrors({
        email: emailErr,
        password: passwordErr,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Тут додати register запит
      console.log("Дані валідні, відправка:", formData);
    } catch (error) {
      console.error(error);
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
          <h1 className={styles.title}>Реєстрація</h1>
          <p className={styles.subtitle}>Створіть акаунт з email ХНУРЕ</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="email"
            placeholder="Email"
            error={errors.email}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
          <Input
            onChange={handleChange}
            value={formData.password}
            name="password"
            type="password"
            placeholder="Пароль"
            error={errors.password}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
          <Checkbox label="Запам’ятати мене" />
          <Button type="submit" fullWidth isDisabled={isLoading}>
            {isLoading ? "Створення..." : "Створити акаунт"}
          </Button>
        </form>

        <div className={styles.links}>
          <p>
            Вже маєте акаунт ? <Link to="/login">Авторизуватися</Link>
          </p>
        </div>
      </section>
    </AuthLayout>
  );
}

export default RegisterPage;
