import React, { useState } from 'react';
import { registerUser } from '../api/registrationApi';
import { useRegister } from '../hooks/useRegister';
import styles from './LoginContainer.module.css';
import { Button } from '../../../shared/ui/index';
import { formatPhoneLive } from '../utils/formatters/phone';

export const RegistrationContainer = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationPassed = validateForm();
    if (!validationPassed) return;

    setIsLoading(true);
    try {
      const userData = {
        name,
        email,
        password,
        phone: number.replace(/\D/g, ''), // только цифры
      };

      const response = await registerUser(userData);
      console.log('Успешная регистрация:', response);
      // TODO: Перенаправление после регистрации
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmPasswordChangeWrapper = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleConfirmPasswordChange(e.target.value, password);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Регистрация</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Имя:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={styles.input}
            required
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className={styles.input}
            required
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
            required
          />
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Подтвердите пароль:</label>
          <input
            type="password"
            value={rePassword}
            onChange={handleConfirmPasswordChangeWrapper}
            className={styles.input}
            required
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Телефон:</label>
          <input
            type="tel"
            value={formatPhoneLive(number)}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className={styles.input}
            placeholder="+7 (___) ___-__-__"
            required
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <Button type="submit" disabled={isLoading} aria-busy={isLoading}>
          <span>{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}</span>
        </Button>
      </form>
    </div>
  );
};
