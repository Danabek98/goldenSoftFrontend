export interface LoginFormProps {
  email: string;
  password: string;
  error: string | null;
  isLoading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  email: string;
}

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface RegistrationResponse {
  userId: number;
  name: string;
  email: string;
  password: string; // Обычно бэкенд не возвращает пароль, это пример
  phone: string;
}
