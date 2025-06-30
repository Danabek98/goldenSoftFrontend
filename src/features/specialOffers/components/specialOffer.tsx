import React from 'react';
import { Button } from '../../../shared/ui/index';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styles from './specialOffer.module.css';
import { useState } from 'react';

export const SpecialOffers = () => {
  const [activeDot, setActiveDot] = useState(1);

  const handlePrev = () => setActiveDot((prev) => (prev === 1 ? 3 : prev - 1));
  const handleNext = () => setActiveDot((prev) => (prev === 3 ? 1 : prev + 1));

  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <div className={styles.left}>
          <img src="" alt="" />
        </div>
        <div className={styles.right}>
          <h1>name</h1>
          <p>discreption</p>
          <p>Цена</p>
          <h2>prise</h2>
          <Button>Добавить в корзину</Button>
        </div>
      </div>

      <div className={styles.switcher}>
        <BsChevronLeft className={styles.arrows} onClick={handlePrev} />
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className={`${styles.dotContainer} ${
              activeDot === dot ? styles.activeDot : ''
            }`}
          >
            <span className={styles.dot}>&#x2022;</span>
          </div>
        ))}
        <BsChevronRight className={styles.arrows} onClick={handleNext} />
      </div>
    </div>
  );
};
