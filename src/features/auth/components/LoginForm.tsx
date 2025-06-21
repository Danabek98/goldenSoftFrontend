import React from 'react';

// Определение интерфейса пропсов компонента LoginForm
interface LoginFormProps {
  email: string; // Текущее значение email для контролируемого input
  password: string; // Текущее значение пароля для контролируемого input
  error: string | null; // Сообщение об ошибке (null если ошибок нет)
  isLoading: boolean; // Флаг состояния загрузки (true во время выполнения запроса)
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Обработчик изменения email
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Обработчик изменения пароля
  onSubmit: (e: React.FormEvent) => void; // Обработчик отправки формы
}

/**
 * Компонент формы входа (LoginForm)
 *
 * Чистый презентационный компонент, отвечающий только за отображение UI.
 * Не содержит бизнес-логики - все данные и обработчики получает через пропсы.
 *
 * Особенности:
 * - Контролируемые inputs (значения управляются через пропсы)
 * - Поддержка состояния загрузки (блокировка полей ввода)
 * - Отображение ошибок авторизации
 * - Валидация на уровне браузера (required fields)
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  error,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    // Форма с обработчиком onSubmit
    <form onSubmit={onSubmit}>
      <h2>Вход</h2>

      {/* Блок ввода email */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email" // Тип email для браузерной валидации
          id="email" // Связь с label через htmlFor
          name="email" // Имя поля для формы
          value={email} // Контролируемое значение
          onChange={onEmailChange} // Обработчик изменений
          required // Обязательное поле
          disabled={isLoading} // Блокировка во время загрузки
          aria-busy={isLoading} // ARIA-атрибут для доступности
          aria-describedby="email-error" // Связь с сообщением об ошибке
        />
      </div>

      {/* Блок ввода пароля */}
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password" // Скрытие вводимых символов
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          required
          disabled={isLoading}
          aria-busy={isLoading}
          aria-describedby="password-error"
        />
      </div>

      {/* Блок отображения ошибок */}
      {error && (
        <p
          id="form-error"
          role="alert" // ARIA-роль для сообщений об ошибках
          style={{ color: 'red' }} // Инлайн стили для простоты (в продакшне лучше CSS-классы)
        >
          {error}
        </p>
      )}

      {/* Кнопка отправки формы */}
      <button
        type="submit"
        disabled={isLoading} // Блокировка во время загрузки
        aria-label={isLoading ? 'Происходит вход в систему' : 'Войти в систему'}
      >
        {/* Условный рендеринг текста кнопки */}
        {isLoading ? (
          <>
            <span role="status">Вход...</span>
            {/* Можно добавить spinner */}
          </>
        ) : (
          'Войти'
        )}
      </button>
    </form>
  );
};
