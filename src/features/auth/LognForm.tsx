// src/features/auth/LoginForm.tsx

import React, { useState } from 'react';
import { loginUser } from '../../services/api/auth/authApi';
import { LoginRequest } from '../../types/auth';

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<LoginRequest>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await loginUser(form);
      console.log('Успешный вход:', result);
      // Например, сохранить токен в localStorage:
      localStorage.setItem('token', result.token);
    } catch (err: any) {
      setError(err.message || 'Ошибка входа');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
