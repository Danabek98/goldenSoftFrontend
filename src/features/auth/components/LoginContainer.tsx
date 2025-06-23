import React from 'react';
import { useLogin } from '../hooks/useLogin';
import styles from './LoginContainer.module.css';
import { Button } from '../../../shared/ui/index';

export const LoginContainer = () => {
  const {
    values: { email, password },
    errors,
    handlers: { handleEmailChange, handlePasswordChange },
    validateForm,
  } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Форма не валидна
    }

    // Отправка данных...
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Вход в систему</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Поле ввода email */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        {/* Поле ввода пароля */}
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Кнопка отправки формы */}
        <Button type="submit">
          <span>Войти</span>
        </Button>
      </form>
    </div>
  );
};
