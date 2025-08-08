// api/products.ts
export const createProduct = async (formData: FormData): Promise<any> => {
  const response = await fetch('http://localhost:8080/products/create', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Ошибка при создании продукта');
  }

  return response.json();
};
