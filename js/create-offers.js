import {getRandomInteger, getRandomFloatingPointNumber, getRandomArrayElement, createArray} from './utils.js';
import {TYPES, FEATURES, PHOTOS, HOURS} from './data.js';

/**
 * Функция получает случайный элемент из массива FEATURES.
 * @returns {*} Случайный элемент массива.
 */
const getRandomFeaturesElement = () => getRandomArrayElement(FEATURES);

/**
 * Функция получает случайный элемент из массива PHOTOS.
 * @returns {*} Случайный элемент массива.
 */
const getRandomPhotosElement = () => getRandomArrayElement(PHOTOS);

/**
 * Функция создает объект объявления с определенным набором свойств.
 * @returns {{offer: {features: *[], rooms: number, address: string, checkin: *, price: number, guests: number, description: string, title: string, type: *, checkout: *, photos: *[]}, author: {avatar: string}, location: {lng: number, lat: number}}} Объект объявления.
 */
const createOffer = () => {
  let num = getRandomInteger(1, 10);
  let coordOne = getRandomFloatingPointNumber(35.65000, 35.70000, 5);
  let coordTwo = getRandomFloatingPointNumber(139.70000, 139.80000, 5);
  let hour = getRandomArrayElement(HOURS);
  let features = createArray(getRandomInteger(1, FEATURES.length), getRandomFeaturesElement);
  let photos = createArray(getRandomInteger(1, PHOTOS.length), getRandomPhotosElement);

  return {
    author: {
      avatar: `img/avatars/user${num < 10 ? '0' + num : num}.png`
    },
    offer: {
      title: `Ads heading ${num}`,
      address: `${coordOne}, ${coordTwo}`,
      price: getRandomInteger(0, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 100),
      guests: getRandomInteger(1, 100),
      checkin: hour,
      checkout: hour,
      features: [...new Set(features)],
      description: `Великолепная съемная недвижимость в центре Токио.`,
      photos: [...new Set(photos)]
    },
    location: {
      lat: coordOne,
      lng: coordTwo
    }
  };
};

/**
 * Функция создает массив объектов объявлений.
 * @param count Целое число задает количество объектов в массиве.
 * @returns {*[]} Массив объектов.
 */
const createListOffers = (count) => createArray(count, createOffer);

export {createListOffers};
