import { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/validators';

export const useLogin = () => {
  // Явно указываем тип состояния
  const [values, setValues] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });

  const [errors, setErrors] = useState<{
    email: string | null;
    password: string | null;
  }>({ email: null, password: null });

  const handleEmailChange = (value: string) => {
    setValues((prev) => ({ ...prev, email: value }));
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (value: string) => {
    setValues((prev) => ({ ...prev, password: value }));
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(values.email),
      password: validatePassword(values.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== null);
  };

  return {
    values,
    errors,
    handlers: { handleEmailChange, handlePasswordChange },
    validateForm,
  };
};
