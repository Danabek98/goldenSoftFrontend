/**
 * Форматирует российский номер телефона по мере ввода
 * @param phone - строка с номером (например, "7916123")
 * @returns Отформатированный номер (например, "+7 (916) 123")
 */
export const formatPhoneLive = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');

  if (!digits) return '';

  let result = '+7';

  // Пропускаем начальную 7 или 8
  let index = digits.startsWith('7') || digits.startsWith('8') ? 1 : 0;

  if (digits.length > index) {
    result += ' (';
    result += digits.substring(index, index + 3);
  }

  if (digits.length >= index + 4) {
    result += ') ';
    result += digits.substring(index + 3, index + 6);
  }

  if (digits.length >= index + 7) {
    result += '-';
    result += digits.substring(index + 6, index + 8);
  }

  if (digits.length >= index + 9) {
    result += '-';
    result += digits.substring(index + 8, index + 10);
  }

  return result;
};
