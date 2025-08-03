// hooks/useCreateProductForm.ts
import { useState } from 'react';

export const useCreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    oldPrice: 0,
    inStock: true,
    equipment: '',
    weight: 0,
    size: '',
    hasApp: false,
    unlockType: '',
    material: '',
    description: '',
    mainImage: '',
    images: [] as File[],
    colors: [{ id: '' }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }));
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleFileChange,
  };
};
