import React from 'react';
import styles from './WhyUs.module.css';
import productReturn from './img/resend.png';
import like from './img/evaluate.png';

export const WhyUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.numbersArea}>
        <div>
          <b>7,667</b>
          <p>Счастливых клиентов</p>
        </div>
        <div>
          <b>1234</b>
          <p>Продуктов на выбор</p>
        </div>
        <div>
          <b>667</b>
          <p>Продаж в день</p>
        </div>
        <div>
          <b>25</b>
          <p>Лет на рынке</p>
        </div>
      </div>
      <div className={styles.whyUsArea}>
        <p className={styles.whyUsTitle}>Почему GoldenService? </p>
        <div className={styles.boxes}>
          <div>
            <img src={productReturn} alt="product return" />
            <p>Возврат удвоенной стоимости каждого замка в случае брака. </p>
          </div>
          <div>
            <img src={like} alt=" like img" />
            <p>Наносим ваш логотип компании на наш продукт </p>
          </div>
          <div>
            <img src={productReturn} alt="product return" />
            <p>Возврат удвоенной стоимости каждого замка в случае брака. </p>
          </div>
        </div>
      </div>
    </div>
  );
};
