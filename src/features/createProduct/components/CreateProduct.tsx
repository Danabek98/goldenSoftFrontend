import React, { useState } from 'react';
import styles from './CreateProduct.module.css';
import { useCreateProductForm } from '../hooks/useCreateProduct';

export const CreateProduct = () => {
  const { formData, setFormData, handleChange, handleFileChange } =
    useCreateProductForm();
  // const [formData, setFormData] = useState({
  //   name: '',
  //   price: 0,
  //   oldPrice: 0,
  //   inStock: true,
  //   equipment: '',
  //   weight: 0,
  //   size: '',
  //   hasApp: false,
  //   unlockType: '',
  //   material: '',
  //   description: '',
  //   mainImage: '',
  //   images: [] as File[],
  //   colors: [{ id: '' }],
  // });

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value, type } = e.target;

  //   if (type === 'checkbox') {
  //     const { checked } = e.target as HTMLInputElement;
  //     setFormData((prev) => ({ ...prev, [name]: checked }));
  //   } else if (type === 'number') {
  //     setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const newFiles = Array.from(e.target.files);
  //     setFormData((prev) => ({
  //       ...prev,
  //       images: [...prev.images, ...newFiles],
  //     }));
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    data.append('name', formData.name);
    data.append('price', String(formData.price));
    data.append('oldPrice', String(formData.oldPrice));
    data.append('inStock', String(formData.inStock));
    data.append('equipment', formData.equipment);
    data.append('weight', String(formData.weight));
    data.append('size', formData.size);
    data.append('hasApp', String(formData.hasApp));
    data.append('unlockType', formData.unlockType);
    data.append('material', formData.material);
    data.append('description', formData.description);
    data.append('mainImage', formData.mainImage);

    // Добавляем файлы
    formData.images.forEach((file, index) => {
      data.append('images', file); // или `images[${index}]`
    });

    // Добавим цвета
    formData.colors.forEach((color, index) => {
      data.append(`colors[${index}]`, color.id);
    });

    try {
      const response = await fetch('http://localhost:8080/products/create', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Ошибка при создании продукта');
      }

      const result = await response.json();
      alert(`Товар создан: ${result.name}`);
    } catch (err: any) {
      alert(err.message || 'Неизвестная ошибка');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2>Создание продукта</h2>
      <label className={styles.label}>
        Название:
        <input
          name="name"
          placeholder="Введите название"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label className={styles.label}>
        Цена:
        <input
          type="number"
          name="price"
          placeholder="Цена"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Старая цена:
        <input
          type="number"
          name="oldPrice"
          placeholder="Старая цена"
          value={formData.oldPrice}
          onChange={handleChange}
        />
      </label>

      <label className={styles.label}>
        Комплектация:
        <input
          name="equipment"
          placeholder="Без мартизы, с мартизой и т.д"
          value={formData.equipment}
          onChange={handleChange}
        />
      </label>

      <label className={styles.label}>
        Вес:
        <input
          type="number"
          name="weight"
          placeholder="Вес"
          value={formData.weight}
          onChange={handleChange}
          className={styles.weight}
        />
      </label>
      <label className={styles.label}>
        Размер:
        <input
          name="size"
          placeholder="0 мм * 0 мм * 0 мм"
          value={formData.size}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Тип разблокировки:
        <input
          name="unlockType"
          placeholder="Пин код, отпечаток пальца и т.д."
          value={formData.unlockType}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Материал:
        <input
          name="material"
          placeholder="Сталь, силиконовые вставки и т.д."
          value={formData.material}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Описание:
        <textarea
          name="description"
          placeholder="Особенности и преимущества этого товара"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Изображения (загрузите с компьютера):
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className={styles.preview}>
          {formData.images.map((file, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(file)}
              alt={`preview-${idx}`}
              style={{ width: '100px', height: 'auto', marginRight: '8px' }}
            />
          ))}
        </div>
      </label>
      <label className={styles.label}>
        В наличии:
        <input
          type="checkbox"
          name="inStock"
          checked={formData.inStock}
          onChange={handleChange}
        />
      </label>
      <label className={styles.label}>
        Есть приложение:
        <input
          type="checkbox"
          name="hasApp"
          checked={formData.hasApp}
          onChange={handleChange}
        />
      </label>

      {/* можно добавить поля для изображений и цветов, например input[type="text"] по очереди */}
      <button className={styles.btn} type="submit">
        Создать продукт
      </button>
    </form>
  );
};

export default CreateProduct;
