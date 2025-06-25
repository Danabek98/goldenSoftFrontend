import { LoginRequest, LoginResponse } from '../types/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  // Ошибка — пытаемся разобрать JSON
  const errorData = await response.json().catch(() => ({}));

  if (!response.ok) {
    let message = 'Ошибка авторизации';

    switch (response.status) {
      case 400:
        message = errorData.message || 'Неверный формат запроса';
        break;
      case 401:
        message = 'Неправильный логин или пароль';
        break;
      case 403:
        message = 'Доступ запрещён';
        break;
      case 500:
        message = 'Ошибка сервера. Попробуйте позже';
        break;
      default:
        message = errorData.message || `Ошибка: ${response.status}`;
    }

    throw new Error(message);
  }

  return response.json();
};
