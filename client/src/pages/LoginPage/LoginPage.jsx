import React from "react";
import { Link } from "react-router";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./LoginPage.module.css";

function LoginPage() {
  return (
    <AuthLayout>
      <section className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Авторизація</h1>
          <p className={styles.subtitle}>Авторизуйтеся з email XHYPE</p>
        </div>

        <form className={styles.form}>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Пароль" />

          <Button type="submit" fullWidth>
            Увійти
          </Button>
        </form>

        <div className={styles.links}>
          <p>
            Забули пароль ? <Link to="/reset-password">Змінити пароль</Link>
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