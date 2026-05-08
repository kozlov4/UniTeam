import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./LoginPage.module.css";
import { validateEmail, validatePassword } from "../../utils/validators";
import { login } from "../../services/auth.service";
import { useUserStore } from "../../stores/userStore";

function LoginPage() {
  const navigate = useNavigate();

  const setAuth = useUserStore((state) => state.setAuth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

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

    setServerError("");
    setIsLoading(true);

    try {
      const userData = await login(formData);
      setAuth(userData?.user, userData.access_token, userData.refresh_token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.status == 401) {
        setServerError("Невірний пароль або пошта");
      } else {
        setServerError(error.response?.data?.message || "Помилка сервера");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    if (serverError) {
      setServerError("");
    }
  };

  return (
    <AuthLayout>
      <section className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Авторизація</h1>
          <p className={styles.subtitle}>Авторизуйтеся з email XHYPE</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {serverError && <p className={styles.error}>{serverError}</p>}
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

          <Button type="submit" fullWidth isDisabled={isLoading}>
            {isLoading ? "Вхід..." : "Увійти"}
          </Button>
        </form>

        <div className={styles.links}>
          <p>
            Забули пароль? <Link to="/forgot-password">Змінити пароль</Link>
          </p>
          <p>
            Не маєте акаунту? <Link to="/register">Зареєструватися</Link>
          </p>
        </div>
      </section>
    </AuthLayout>
  );
}

export default LoginPage;
