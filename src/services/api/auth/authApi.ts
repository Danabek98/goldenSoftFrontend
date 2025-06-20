// src/features/auth/authApi.ts

import { LoginRequest, LoginResponse } from '../../../types/auth';

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
