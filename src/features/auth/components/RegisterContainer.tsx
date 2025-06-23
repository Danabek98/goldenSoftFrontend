import React from 'react';
import { useState } from 'react';
import { registerUser } from '../api/registrationApi';
import { useRegister } from '../hooks/useRegister';
import styles from './LoginContainer.module.css';
import { Button } from '../../../shared/ui/index';
import { formatPhoneLive } from '../utils/formatters/phone';

export const RegistrationContainer = () => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const {
    values: { email, name, password, number, rePassword },
    errors,
    handlers: {
      handleEmailChange,
      handleNameChange,
      handlePasswordChange,
      handleConfirmPasswordChange,
      handlePhoneChange,
    },
    validateForm,
  } = useRegister();

  // Оптимизированный обработчик для подтверждения пароля
  const handleConfirmPasswordChangeWrapper = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleConfirmPasswordChange(e.target.value, password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await registerUser(formData);
      console.log('Регистрация успешна:', response);
      // Можно перенаправить пользователя:
      // navigate('/login');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Регистрация</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Поле ввода name */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Имя:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={styles.input}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        {/* Поле ввода email */}
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

        {/* Поле ввода пароля */}
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

        {/* Поле ввода повторного пароля */}
        {/* Поле Подтверждение пароля */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Подтвердите пароль:</label>
          <input
            type="password"
            value={rePassword}
            onChange={handleConfirmPasswordChangeWrapper}
            className={styles.input}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>

        {/* Поле ввода телефона */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Телефон:</label>
          <input
            type="tel"
            value={formatPhoneLive(number)}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className={styles.input}
            placeholder="+7 (___) ___-__-__"
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>
        {/* Кнопка отправки формы */}
        <Button type="submit">
          <span>Регистрация</span>
        </Button>
      </form>
    </div>
  );
};
