import { useState } from 'react';
import { validateLoginEmail, validateLoginPassword } from '../utils/validators';

export const useLogin = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{
    email: string | null;
    password: string | null;
  }>({
    email: null,
    password: null,
  });

  const handleEmailChange = (email: string) => {
    setValues((prev) => ({ ...prev, email }));
    setErrors((prev) => ({ ...prev, email: null }));
  };

  const handlePasswordChange = (password: string) => {
    setValues((prev) => ({ ...prev, password }));
    setErrors((prev) => ({ ...prev, password: null }));
  };

  const validateForm = () => {
    const emailError = validateLoginEmail(values.email);
    const passwordError = validateLoginPassword(values.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  const submitForm = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка авторизации');
      }

      const data = await response.json();
      console.log('Успешный вход:', data);
      // Тут можешь сохранить токен, перейти на страницу и т.д.
    } catch (err: any) {
      console.error('Ошибка входа:', err.message);
      // можно отобразить err.message в UI
    }
  };

  return {
    values,
    errors,
    handlers: {
      handleEmailChange,
      handlePasswordChange,
    },
    validateForm,
    submitForm,
  };
};
