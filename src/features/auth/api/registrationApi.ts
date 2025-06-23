import { RegistrationRequest, RegistrationResponse } from '../types/auth';
// Конфигурация
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

/**
 * Регистрация нового пользователя
 * @param userData - Данные для регистрации
 * @returns Promise с данными зарегистрированного пользователя
 * @throws {Error} При ошибке сети или сервера
 */
export const registerUser = async (
  userData: RegistrationRequest
): Promise<RegistrationResponse> => {
  const url = `${API_BASE_URL}/auth/register`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Пытаемся распарсить ошибку от сервера
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Ошибка регистрации');
    }

    return await response.json();
  } catch (error) {
    // Типизация ошибки для TypeScript
    if (error instanceof Error) {
      throw new Error(`Не удалось зарегистрироваться: ${error.message}`);
    }
    throw new Error('Неизвестная ошибка при регистрации');
  }
};
