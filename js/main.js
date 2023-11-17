'use strict';

/**
 * Функция, проверяющая входящие параметры
 * @param params Массив входящих параметров
 */
function checkParams(...params) {
  for (let i = 0; i < params.length; i++) {
    if (typeof params[i] !== 'number' || Number.isNaN(params[i])) {
      throw 'Необходимо ввести число.';
    }

    if (params[i] < 0) {
      throw 'Необходимо число больше или равное нулю.';
    }
  }
}

/**
 * Функция, возвращающая случайное целое число из переданного диапазона включительно.
 * @param from Нижняя граница диапазона
 * @param to Верхняя граница диапазона
 * @returns {number} Случайное целое число
 */
function getRandomInteger(from = 1, to = 0) {
  checkParams(from, to);

  return Math.floor(Math.random() * (to - from + 1) + from);
}

/**
 * Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
 * @param from Нижняя граница диапазона
 * @param to Верхняя граница диапазона
 * @param decimalPlaces Количество знаков после запятой
 * @returns {number} Случайное число с заданным количеством знаков после запятой
 */
function getRandomFloatingPointNumber(from = 1, to = 0, decimalPlaces = 0) {
  checkParams(from, to, decimalPlaces);

  let randNum = Math.random() * (to - from) + from;

  return parseFloat(randNum.toFixed(decimalPlaces));
}

getRandomInteger(2, 8);
getRandomFloatingPointNumber(1.567, 1.890, 2);
