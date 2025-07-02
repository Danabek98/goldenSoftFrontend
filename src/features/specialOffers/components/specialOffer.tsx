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
          <h1 className={styles.title}>name</h1>
          <p className={styles.discreption}>discreption</p>
          <p className={styles.price}>Цена</p>
          <div className={styles.prices}>
            <h3>33000 ₸</h3>
            <h3 className={styles.oldPrice}>35000 ₸</h3>
          </div>
          <Button className={styles.btn}>Добавить в корзину</Button>
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
