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
    credentials: 'include', // если работаешь с куками
    body: JSON.stringify(credentials),
  });

  const data = await response.json().catch(() => ({})); // Один раз парсим тело

  if (!response.ok) {
    let message = 'Ошибка авторизации';

    switch (response.status) {
      case 400:
        message = data.message || 'Неверный формат запроса';
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
        message = data.message || `Ошибка: ${response.status}`;
    }

    throw new Error(message);
  }

  return data; // Возвращаем уже распарсенные данные
};

export const logoutUser = async (): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/user/logout`, {
    method: 'POST',
    credentials: 'include', // важно: для отправки куки
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Ошибка при выходе');
  }
};
