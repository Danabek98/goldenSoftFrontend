import { useState } from 'react';

/**
 * Кастомный хук useLogin для управления формой входа
 *
 * Отвечает за:
 * - Хранение состояния формы (email, password)
 * - Обработку изменений полей ввода
 * - Отправку данных на сервер
 * - Управление состоянием загрузки и ошибками
 */
export const useLogin = () => {
  // Состояние для хранения email
  const [email, setEmail] = useState('');
  // Состояние для хранения пароля
  const [password, setPassword] = useState('');
  // Состояние для хранения поторного пароля
  const [rePassword, setRePassword] = useState('');
  // Состояние для хранения ошибок (null когда ошибок нет)
  const [error, setError] = useState<string | null>(null);
  // Флаг состояния загрузки (true во время выполнения запроса)
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Обработчик изменения email
   * @param e - Событие изменения input элемента
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Обновляем состояние email
    setError(null); // Сбрасываем ошибки при изменении данных
  };

  /**
   * Обработчик изменения пароля
   * @param e - Событие изменения input элемента
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); // Обновляем состояние пароля
    setError(null); // Сбрасываем ошибки при изменении данных
  };

  /**
   * Обработчик изменения повторного пароля
   * @param e - Событие изменения input элемента
   */
  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value); // Обновляем состояние пароля
    setError(null); // Сбрасываем ошибки при изменении данных
  };
  /**
   * Обработчик отправки формы
   * @param e - Событие отправки формы
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    setIsLoading(true); // Активируем состояние загрузки
    setError(null); // Сбрасываем предыдущие ошибки

    try {
      // Здесь будет вызов API для авторизации
      console.log('Отправка данных:', { email, password });

      // В реальном приложении здесь будет:
      // const response = await authApi.login({ email, password });
      // Обработка успешного ответа...
    } catch (err) {
      // Обработка ошибок с приведением типа
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setIsLoading(false); // Выключаем состояние загрузки в любом случае
    }
  };

  // Возвращаем все необходимые значения и обработчики
  return {
    email, // Текущее значение email
    password, // Текущее значение пароля
    rePassword, // Текущее значение повторного пароля
    error, // Текущая ошибка (или null)
    isLoading, // Флаг загрузки
    handleEmailChange, // Обработчик изменения email
    handlePasswordChange, // Обработчик изменения пароля
    handleRePasswordChange, // Обработчик изменения пароля
    handleSubmit, // Обработчик отправки формы
  };
};
