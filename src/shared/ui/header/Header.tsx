import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo_1 from '../../assets/img/Logo_1.png';
import { PiShoppingCartThin, PiHeartThin, PiUserThin } from 'react-icons/pi';
import { useAuth } from './hooks/useAuth';

export const Header = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleUserClick = () => {
    if (loading) return;
    if (!user) {
      navigate('/login');
    } else {
      setShowMenu((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    await fetch('http://localhost:8080/user/logout', {
      method: 'POST',
      credentials: 'include',
    });
    window.location.reload();
  };

  // Закрытие dropdown при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p>Скидка 10% по промокоду “ZAMOK” на все заказы до 10.09</p>
        <u>Обратный звонок</u>
      </div>

      <div className={styles.Header}>
        <img className={styles.logo} src={logo_1} alt="logo" />
        <div className={styles.navigation}>
          <p>Главная</p>
          <p>Каталог ▾</p>
          <p>Оптовая продажа</p>
          <p>О нас</p>
        </div>

        <div className={styles.icons}>
          <PiShoppingCartThin
            className={styles.icon}
            onClick={() => navigate('/basket')}
          />
          <PiHeartThin className={styles.icon} />

          <div className={styles.userWrapper} ref={dropdownRef}>
            <PiUserThin
              className={styles.icon}
              onClick={handleUserClick}
              style={{ cursor: 'pointer' }}
            />
            {showMenu && user && (
              <div className={styles.dropdown}>
                <button onClick={() => navigate('/profile')}>Профиль</button>
                <button onClick={handleLogout}>Выйти</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
