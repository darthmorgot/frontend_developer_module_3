/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно.
 * @param from Нижняя граница диапазона.
 * @param to Верхняя граница диапазона.
 * @returns {number} Случайное целое число.
 */
const getRandomInteger = (from = 1, to = 0) => Math.floor(Math.random() * (to - from + 1) + from);

/**
 * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
 * @param from Нижняя граница диапазона.
 * @param to Верхняя граница диапазона.
 * @param decimalPlaces Количество знаков после запятой.
 * @returns {number} Случайное число с заданным количеством знаков после запятой.
 */
const getRandomFloatingPointNumber = (from = 1, to = 0, decimalPlaces = 1) => {
  let randNum = Math.random() * (to - from) + from;

  return +randNum.toFixed(decimalPlaces);
}
/**
 * Функция, возвращающая случайный элемент массива.
 * @param arr Массив, из которого выбирается случайный элемент.
 * @returns {*} Случайный элемент массива.
 */
const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

/**
 * Функция, создающая новый массив на основе переданного объекта.
 * @param count Значение свойства объекта, на основе которого создаётся массив (задаёт длину массива).
 * @param fn Функция преобразования элемента перед его добавлением в массив.
 * @returns {unknown[]} Новый массив.
 */
const createArray = (count, fn) => Array.from({length: count}, fn);

/**
 * Функция для вывода сообщения об ошибке.
 * @param message Строка сообщения об ошибке.
 */
const showAlert = (message) => {
  const map = document.querySelector('.map');

  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '5px 0';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#c00';
  alertContainer.style.color = '#fff';
  alertContainer.style.fontSize = '24px';

  alertContainer.textContent = message;

  map.append(alertContainer);
}

export {getRandomInteger, getRandomFloatingPointNumber, getRandomArrayElement, createArray, showAlert};
