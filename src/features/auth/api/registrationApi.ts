import { RegistrationRequest, RegistrationResponse } from '../types/auth';
// Конфигурация
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/';

/**
 * Регистрация нового пользователя
 * @param userData - Данные для регистрации
 * @returns Promise с данными зарегистрированного пользователя
 * @throws {Error} При ошибке сети или сервера
 */
export const registerUser = async (
  userData: RegistrationRequest
): Promise<RegistrationResponse> => {
  const url = `${API_BASE_URL}user/registration`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || 'Ошибка регистрации';

      // Обрабатываем специфические ошибки от сервера
      if (message.includes('user with this email or phone already exists')) {
        throw new Error('Email или номер телефона уже занят');
      }

      throw new Error(message);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Не удалось зарегистрироваться: ${error.message}`);
    }
    throw new Error('Неизвестная ошибка при регистрации');
  }
};
