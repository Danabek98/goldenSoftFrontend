import React, { useEffect, useState } from 'react';
import styles from './popularProducts.module.css';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import {
  getPopularProducts,
  PopularProductInfo,
} from '../api/getPopularProducts';
import { createPopularProduct } from '../api/createPopularProduct';

export const PopularProducts = () => {
  const [products, setProducts] = useState<PopularProductInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPopularProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Ошибка при загрузке товаров');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  if (loading) return <p className={styles.loading}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Наши популярные продукты</p>
        <div className={styles.switcher}>
          <BsChevronLeft onClick={handlePrev} className={styles.arrow} />
          <BsChevronRight onClick={handleNext} className={styles.arrow} />
        </div>
      </div>

      <div className={styles.boxes}>
        {visibleProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <p>{product.name}</p>
            <p>{product.price}₸</p>
            {product.old_price && (
              <p className={styles.oldPrice}>{product.old_price}₸</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// <div>
//           <div className={styles.top}>
//             <div className={styles.up}>
//               <div className={styles.inStock}>
//                 <div>
//                   <IoMdCheckmark />
//                 </div>
//                 <p>В наличии</p>
//               </div>
//               <div className={styles.sale}>
//                 <p>SALE</p>
//               </div>
//             </div>
//           </div>
//           <div className={styles.textArea}>
//             <p className={styles.name}>Дверной Замок Golden Soft для отеля</p>
//             <div className={styles.prices}>
//               <p>33 000 ₸</p>
//               <del>37 000 ₸</del>
//             </div>
//           </div>
//         </div>
//         <div></div>
//         <div></div>
//         <div></div>
