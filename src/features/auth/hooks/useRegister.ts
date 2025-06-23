import { useState } from 'react';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateConfirmPassword,
} from '../utils/validators';

/**
 * Кастомный хук useLogin для управления формой входа
 *
 * Отвечает за:
 * - Хранение состояния формы (email, password)
 * - Обработку изменений полей ввода
 * - Отправку данных на сервер
 * - Управление состоянием загрузки и ошибками
 */
export const useRegister = () => {
  // Состояние для хранения name
  const [name, setName] = useState('');
  // Состояние для хранения email
  const [email, setEmail] = useState('');
  // Состояние для хранения пароля
  const [password, setPassword] = useState('');
  // Состояние для хранения поторного пароля
  const [rePassword, setRePassword] = useState('');
  // Состояние для хранения number
  const [number, setNumber] = useState('');
  // Состояния ошибок
  const [errors, setErrors] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  /**
   * Обработчик изменения имени с валидацией
   */
  const handleNameChange = (value: string) => {
    setName(value);
    setErrors((prev) => ({ ...prev, name: validateName(value) || '' }));
  };
  /**
   * Обработчик изменения email с валидацией
   */
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) || '' }));
  };
  /**
  /**
   * Обработчик изменения пароля с валидацией
   */
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) || '' }));
  };

  /**
   * Обработчик изменения подтверждения пароля с валидацией
   * @param value - Значение поля подтверждения пароля
   * @param currentPassword - Текущее значение основного пароля
   */
  const handleConfirmPasswordChange = (
    value: string,
    currentPassword: string
  ) => {
    setRePassword(value);
    setErrors((prev) => ({
      ...prev,
      confirmPassword: validateConfirmPassword(currentPassword, value) || '',
    }));
  };
  /**
   * Обработчик изменения телефона с валидацией
   */
  const handlePhoneChange = (value: string) => {
    // Очищаем ввод, оставляя только цифры и +
    const cleanedValue = value.replace(/[^\d+]/g, '');
    setNumber(cleanedValue);
    setErrors((prev) => ({
      ...prev,
      phone: validatePhone(cleanedValue) || '',
    }));
  };

  /**
   * Валидация всей формы
   * @returns true, если форма валидна
   */
  const validateForm = (): boolean => {
    const newErrors = {
      email: validateEmail(email),
      name: validateName(name),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, rePassword),
      phone: validatePhone(number),
    };

    setErrors({
      email: newErrors.email || '',
      name: newErrors.name || '',
      password: newErrors.password || '',
      confirmPassword: newErrors.confirmPassword || '',
      phone: newErrors.phone || '',
    });

    return !Object.values(newErrors).some((error) => error !== null);
  };

  return {
    values: { email, name, password, rePassword, number },
    errors,
    handlers: {
      handleEmailChange,
      handleNameChange,
      handlePasswordChange,
      handleConfirmPasswordChange,
      handlePhoneChange,
    },
    validateForm,
  };
};
