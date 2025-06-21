// src/features/auth/authApi.ts

import { LoginRequest, LoginResponse } from '../types/auth';

// Добавляем export для функции, чтобы файл считался модулем
export async function loginUser(
  credentials: LoginRequest
): Promise<LoginResponse> {
  const response = await fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(`Ошибка входа: ${response.statusText}`);
  }

  const data: LoginResponse = await response.json();
  return data;
}

// Альтернативно можно добавить пустой export в конце файла
// export {};
