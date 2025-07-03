// src/features/popularProducts/api/popularProductsApi.ts
export interface PopularProductInfo {
  id: number;
  product_id: number;
  name: string;
  price: number;
  old_price: number;
  main_image: string;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/';

/**
 * Получить список популярных товаров
 */
export const getPopularProducts = async (): Promise<PopularProductInfo[]> => {
  const response = await fetch(`${API_BASE_URL}get-popular-product`, {
    method: 'GET',
  });

  const errorData = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      errorData.message || 'Ошибка при получении популярных товаров'
    );
  }

  return errorData;
};
