import React from 'react';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p>Скидка 10% по промокоду “ZAMOK” на все заказы до 10.09</p>
        <u>Обратный звонок</u>
      </div>
      <img src="" alt="" />
    </div>
  );
};
