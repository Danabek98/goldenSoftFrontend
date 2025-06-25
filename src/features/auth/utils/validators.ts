/**
 * Валидация email
 * @param email - Входная строка для проверки
 * @returns Сообщение об ошибке или null, если валидация пройдена
 */
export const validateEmail = (email: string): string | null => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email обязателен';
  if (!regex.test(email)) return 'Некорректный формат email';
  return null;
};

/**
 * Валидация имени
 * @param name - Входная строка
 * @returns Сообщение об ошибке или null
 */
export const validateName = (name: string): string | null => {
  if (!name) return 'Имя обязательно';
  if (name.length < 2) return 'Имя слишком короткое';
  if (name.length > 50) return 'Имя слишком длинное';
  return null;
};

/**
 * Валидация пароля
 * @param password - Входная строка
 * @returns Сообщение об ошибке или null
 */
export const validatePassword = (password: string): string | null => {
  if (!password) return 'Пароль обязателен';
  if (password.length < 8) return 'Пароль должен содержать минимум 8 символов';
  if (!/[A-Z]/.test(password)) return 'Добавьте хотя бы одну заглавную букву';
  if (!/[0-9]/.test(password)) return 'Добавьте хотя бы одну цифру';
  return null;
};

/**
 * Валидация телефонного номера
 * @param phone - Входная строка для проверки
 * @returns Сообщение об ошибке или null, если валидация пройдена
 */
export const validatePhone = (phone: string): string | null => {
  // Удаляем все нецифровые символы для проверки длины
  const cleanPhone = phone.replace(/[^\d]/g, '');

  // Минимальная и максимальная длина (без учета форматирования)
  const MIN_LENGTH = 10; // Для РФ без кода страны
  const MAX_LENGTH = 15; // Международные номера

  // Проверки
  if (!phone) return 'Телефон обязателен';

  // Проверка минимальной длины (только цифры)
  if (cleanPhone.length < MIN_LENGTH) {
    return `Номер слишком короткий (минимум ${MIN_LENGTH} цифр)`;
  }

  // Проверка максимальной длины
  if (cleanPhone.length > MAX_LENGTH) {
    return `Номер слишком длинный (максимум ${MAX_LENGTH} цифр)`;
  }

  // Проверка формата (допускаем +, скобки, пробелы и дефисы)
  const formatRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  if (!formatRegex.test(phone)) {
    return 'Используйте только цифры, +, (), - и пробелы';
  }

  // Проверка, что номер содержит достаточно цифр
  const digitCount = phone.match(/\d/g)?.length || 0;
  if (digitCount < MIN_LENGTH) {
    return `Добавьте ещё ${MIN_LENGTH - digitCount} цифр`;
  }

  return null;
};
/**
 * Валидация подтверждения пароля
 * @param password - Основной пароль
 * @param confirmPassword - Пароль для подтверждения
 * @returns Сообщение об ошибке или null
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) return 'Подтвердите пароль';
  if (password !== confirmPassword) return 'Пароли не совпадают';
  return null;
};

export const validateLoginEmail = (email: string): string | null => {
  if (!email) return 'Введите email';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return 'Некорректный формат email';
  return null;
};

export const validateLoginPassword = (password: string): string | null => {
  if (!password) return 'Введите пароль';
  return null;
};
