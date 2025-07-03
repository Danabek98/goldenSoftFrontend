// src/features/popularProducts/api/popularProductsApi.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/';

export interface PopularProductRequest {
  product_id: number;
}

export interface PopularProductResponse {
  id: number;
  product_id: number;
}

/**
 * Добавить продукт в популярные
 */
export const createPopularProduct = async (
  data: PopularProductRequest
): Promise<PopularProductResponse> => {
  const response = await fetch(`${API_BASE_URL}set-popular-product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const errorData = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(errorData.message || 'Ошибка при добавлении в популярные');
  }

  return errorData;
};
