import React from 'react';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import styles from './LoginContainer.module.css';
import { Button } from '../../../shared/ui/index';
import { loginUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom'; // для перехода

export const LoginContainer = () => {
  const {
    values: { email, password },
    errors,
    handlers: { handleEmailChange, handlePasswordChange },
    validateForm,
  } = useLogin();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate(); // хук для перехода
  // const handleLogout = async () => {
  //   try {
  //     await logoutUser();
  //     localStorage.removeItem('token'); // если хранишь токен и в localStorage
  //     // navigate('/login');
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    try {
      const response = await loginUser({ email, password });
      console.log('Успешный вход:', response);
      // localStorage.setItem('token', response.token);
      navigate('/');
    } catch (error: any) {
      setSubmitError(error.message || 'Ошибка входа');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Вход в систему</h2>

      {submitError && <div className={styles.submitError}>{submitError}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className={styles.input}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className={styles.input}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <Button type="submit">
          <span>Войти</span>
        </Button>
      </form>

      <div className={styles.registerBlock}>
        <p className={styles.registerText}>Ещё не зарегистрированы?</p>
        <button
          type="button"
          className={styles.registerButton}
          onClick={() => navigate('/register')}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};
