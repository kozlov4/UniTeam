import React from "react";
import { Link } from "react-router";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./RegisterPage.module.css";
import Checkbox from "../../components/Checkbox/Checkbox";

function RegisterPage() {
  return (
    <AuthLayout>
      <section className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Реєстрація</h1>
          <p className={styles.subtitle}>Створіть акаунт з email ХНУРЕ</p>
        </div>

        <form className={styles.form}>
          <Input type="text" placeholder="Ім'я" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Пароль" />
          <Checkbox label="Запам’ятати мене"/>
          <Button type="submit" fullWidth>
            Створити акаунт
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
