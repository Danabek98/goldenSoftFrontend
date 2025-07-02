import React from 'react';
import styles from './Caregories.module.css';
import { Button } from '../Button/Button';
import soft1 from './img/gSoft1.png';
import soft2 from './img/gSoft2.png';
import soft3 from './img/gSoft3.png';
import soft4 from './img/gSoft4.png';

export const Categories = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Категории</p>
      <div className={styles.boxes}>
        <div>
          <div className={styles.left}>
            <p>Для отелей</p>
            <button className={styles.button}>Перейти</button>
          </div>
          <img src={soft1} alt="" />
        </div>
        <div>
          <div className={styles.left}>
            <p>Для шкафчиков</p>
            <button className={styles.button}>Перейти</button>
          </div>
          <img src={soft2} alt="" />
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <p>Для офисов</p>
            <button className={styles.button}>Перейти</button>
          </div>
          <img src={soft3} alt="" />
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <p>Замки для дома</p>
            <button className={styles.button}>Перейти</button>
          </div>
          <img src={soft4} alt="" />
        </div>
      </div>
      <Button className={styles.allCategories}>Все категории</Button>
    </div>
  );
};
