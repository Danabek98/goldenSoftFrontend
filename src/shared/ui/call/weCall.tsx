import React from 'react';
import styles from './/weCall.module.css';
import { Button } from '../Button/Button';

export const WeCall = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Мы Вам перезвоним</p>
      <p className={styles.discreption}>
        Если у вас возникли какие-то вопросы или проблемы, заполните форму и мы
        Вам перезвоним.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input className={styles.input} placeholder="Ваше имя" type="name" />
        <input className={styles.input} placeholder="Ваш Email" type="email" />
        <Button className={styles.btn} type="submit">
          <span>Отправить</span>
        </Button>
      </form>
    </div>
  );
};
