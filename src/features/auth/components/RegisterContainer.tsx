import React from 'react';
import { useLogin } from '../hooks/useLogin';
import styles from './LoginContainer.module.css';
import { Button } from '../../../shared/ui/index';

export const RegistrationContainer = () => {
  const {
    email,
    password,
    error,
    isLoading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Регистрация</h2>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Поле ввода email */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
            disabled={isLoading}
            required
            aria-describedby={error ? 'email-error' : undefined}
          />
        </div>

        {/* Поле ввода пароля */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Пароль:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
            disabled={isLoading}
            required
            aria-describedby={error ? 'password-error' : undefined}
          />
        </div>

        {/* Кнопка отправки формы */}
        <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
          {isLoading ? <span>Регистрируем...</span> : <span>Регистрация</span>}
        </Button>
      </form>
    </div>
  );
};
