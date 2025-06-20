import { Color } from '../../../types/color';

export async function sendColorData(color: Color): Promise<any> {
  try {
    const response = await fetch('http://localhost:8080/upload/color', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: color.id,
        name: color.name,
        hex_code: color.hex_code,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();
    console.log('Ответ от сервера:', data);
    return data;
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    throw error;
  }
}
