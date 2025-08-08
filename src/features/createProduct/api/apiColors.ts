// api/colors.ts
import { Color } from '../types/formData';

export const fetchAllColors = async (): Promise<Color[]> => {
  const res = await fetch('http://localhost:8080/get/colors');
  if (!res.ok) {
    throw new Error('Не удалось загрузить цвета');
  }
  return res.json();
};
