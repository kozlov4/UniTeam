import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './ForgotPasswordPage.module.css';
import { validateEmail } from '../../utils/validators';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const emailErr = validateEmail ? validateEmail(email) : (email ? '' : 'Email is required');
    
    if (emailErr) {
      setError(emailErr);
      return;
    }

    setIsLoading(true);
    
    //TODO: API запит
    setTimeout(() => {
      setIsLoading(false);
      navigate('/reset-password');
    }, 800);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
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
          <h1 className={styles.title}>Відновлення паролю</h1>
          <p className={styles.subtitle}>Введіть email, на який зареєстрований ваш акаунт. Ми відправимо код підтвердження</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <Input
              onChange={handleChange}
              value={email}
              name="email"
              type="email"
              placeholder="Email"
              error={error}
            />
            {error && <p className={styles.error}>{error}</p>}
          </div>

          <Button type="submit" fullWidth isDisabled={isLoading}>
            {isLoading ? "Відправка..." : "Надіслати"}
          </Button>
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

export default ForgotPasswordPage;
