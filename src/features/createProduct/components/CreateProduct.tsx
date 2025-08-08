import React, { useEffect, useState } from 'react';
import styles from './CreateProduct.module.css';
import { useCreateProductForm } from '../hooks/useCreateProduct';
import { createProduct } from '../api/apiProducts'; // 👈 импорт API-функции
import { fetchAllColors } from '../api/apiColors';
import { Color } from '../types/formData';

export const CreateProduct = () => {
  const { formData, setFormData, handleChange, handleFileChange } =
    useCreateProductForm();

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

    formData.images.forEach((file) => {
      data.append('images', file);
    });

    formData.colors.forEach((color, index) => {
      data.append(`colors[${index}]`, String(color.id));
    });

    try {
      const result = await createProduct(data); // 👈 вызов API-функции
      alert(`Товар создан: ${result.name}`);
    } catch (err: any) {
      alert(err.message || 'Неизвестная ошибка');
    }
  };

  const [availableColors, setAvailableColors] = useState<Color[]>([]);

  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('');

  const handleAddNewColor = async () => {
    if (!newColorName || !newColorHex) return;
    try {
      const res = await fetch('http://localhost:8080/upload/color', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newColorName, hex_code: newColorHex }),
      });

      if (!res.ok) throw new Error('Ошибка при добавлении цвета');
      const newColor = await res.json();

      // Добавим в список
      setAvailableColors((prev) => [...(prev || []), newColor]);

      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor],
      }));

      setNewColorName('');
      setNewColorHex('');
    } catch (err: any) {
      alert(err.message || 'Ошибка при добавлении цвета');
    }
  };

  useEffect(() => {
    const loadColors = async () => {
      try {
        const colors = await fetchAllColors();
        setAvailableColors(colors);
      } catch (err) {
        console.error('Ошибка загрузки цветов:', err);
      }
    };

    loadColors();
  }, []);
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

      <label className={styles.label}>Выберите цвета:</label>

      {/*  Блок выбранных цветов */}
      {formData.colors.length > 0 && (
        <div className={styles.selectedColorArea}>
          {formData.colors.map((color) => (
            <div key={color.id} className={styles.selectedColor}>
              <span
                style={{
                  backgroundColor: color.hexCode,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
              >
                {color.name}
              </span>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    colors: prev.colors.filter((c) => c.id !== color.id),
                  }));
                }}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}

      {/*  Выпадающий список для добавления нового цвета */}
      <select
        value=""
        onChange={(e) => {
          const selectedId = parseInt(e.target.value, 10); // Убедимся что это число
          const selectedColor = availableColors.find(
            (color) => Number(color.id) === selectedId
          );

          if (
            selectedColor &&
            !formData.colors.some((c) => c.id === Number(selectedColor.id))
          ) {
            setFormData((prev) => ({
              ...prev,
              colors: [...prev.colors, selectedColor as Color],
            }));
          }
        }}
        className={styles.colorSelect}
      >
        <option value="" disabled>
          Выберите цвет
        </option>
        {availableColors
          .filter((color) => !formData.colors.some((c) => c.id === color.id))
          .map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
      </select>

      <label className={styles.label}>
        Добавить новый цвет:
        <input
          type="text"
          placeholder="Название цвета"
          onChange={(e) => setNewColorName(e.target.value)}
        />
        <input type="color" onChange={(e) => setNewColorHex(e.target.value)} />
        <button type="button" onClick={handleAddNewColor}>
          Добавить цвет
        </button>
      </label>

      {/* можно добавить поля для изображений и цветов, например input[type="text"] по очереди */}
      <button className={styles.btn} type="submit">
        Создать продукт
      </button>
    </form>
  );
};

export default CreateProduct;
