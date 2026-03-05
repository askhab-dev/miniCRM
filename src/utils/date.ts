/**
 * Функция для проверки, превышает ли дата текущую дату
 * на 30 дней с учётом часового пояса.
 */
export const isMoreThan30Days = (dateString: string) => {
  const targetDate = new Date(dateString);
  const currentDate = new Date();

  // Устанавливаем время на начало дня для чистого сравнения
  targetDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const diffMs = Number(currentDate) - Number(targetDate);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays > 30;
};

/**
 * Функция проверяет является ли строка датой корректной и возвращает ее в формате DD.MM.YYYY
 */
export const getValidDate = (date: string | null) => {
  return date && Date.parse(date) ? new Date(date).toLocaleDateString() : '-';
};
