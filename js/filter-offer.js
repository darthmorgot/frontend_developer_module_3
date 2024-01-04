import {debounce} from './utils.js';
import {resetForm} from './reset-form.js';

const PRICES = {
  middle: 10000,
  high: 50000,
};
const DEFAULT_VALUE = 'any';

const formFilters = document.querySelector('.map__filters');
const selectedType = formFilters.querySelector('#housing-type');
const selectedPrice = formFilters.querySelector('#housing-price');
const selectedRooms = formFilters.querySelector('#housing-rooms');
const selectedGuests = formFilters.querySelector('#housing-guests');
const features = formFilters.querySelectorAll('.map__checkbox');

/**
 * Функция для проверки объявлений по типу жилья.
 * @param offer Объект объявления.
 * @param typeValue Значение типа жилья.
 */
const checkByType = (offer, typeValue) => {
  return offer.offer.type === typeValue || typeValue === DEFAULT_VALUE;
};

/**
 * Функция для проверки объявлений по цене.
 * @param offer Объект объявления.
 * @param priceValue Значение цены.
 */
const checkByPrice = (offer, priceValue) => {
  switch (priceValue) {
    case 'middle':
      return offer.offer.price >= PRICES.middle && offer.offer.price <= PRICES.high;
    case 'low':
      return offer.offer.price < PRICES.middle;
    case 'high':
      return offer.offer.price > PRICES.high;
    default:
      return true;
  }
};

/**
 * Функция для проверки объявлений по количеству комнат.
 * @param offer Объект объявления.
 * @param roomValue Количество комнат.
 */
const checkByRooms = (offer, roomValue) => {
  return offer.offer.rooms === +roomValue || roomValue === DEFAULT_VALUE;
};

/**
 * Функция для проверки объявлений по количеству гостей.
 * @param offer Объект объявления.
 * @param guestValue Количество гостей.
 */
const checkByGuests = (offer, guestValue) => {
  return offer.offer.guests === +guestValue || guestValue === DEFAULT_VALUE;
};

/**
 * Функция для проверки объявлений по типу и количеству удобств.
* @param offer Объект объявления.
* @param featureList Список удобств.
*/
const checkByFeature = (offer, featureList) => {
  if (!featureList.length) return true;
  if (offer.offer.features) {
    return featureList.every((item) => offer.offer.features.includes(item));
  }
};

/**
 * Функция для создания массива проверенных объявлений.
 * @param array Исходный массив объявлений.
 * @returns {*[]} Возвращаемый отфильтрованный массив.
 */
const getCheckedOffers = (array) => {
  let checkedOffers = [];
  let featureList = [];

  for (let feature of features) {
    if (feature.checked) {
      featureList.push(feature.value);
    }
  }

  for (let arrayElement of array) {
    if (
      checkByType(arrayElement, selectedType.value) &&
      checkByPrice(arrayElement, selectedPrice.value) &&
      checkByRooms(arrayElement, selectedRooms.value) &&
      checkByGuests(arrayElement, selectedGuests.value) &&
      checkByFeature(arrayElement, featureList)
    ) {
      checkedOffers.push(arrayElement);
    }
  }
  if (checkedOffers.length === array.length) {
    checkedOffers = [];
  }

  console.log(checkedOffers);
  return checkedOffers;
};

/**
 * Функция для вывода объявлений, отфильтрованных по выбранным признакам.
 * @param array Исходный массив объявлений.
 * @param cb Функция для создания и добавления маркеров на карту.
 */
const filterByAll = (array, cb) => {
  formFilters.addEventListener('change', debounce(() => {
    let arrCheckedOffers = getCheckedOffers(array);

    if (arrCheckedOffers.length !== 0) {
      cb(array, arrCheckedOffers.slice(0, 10));
    } else if (
      selectedType.value === DEFAULT_VALUE &&
      selectedPrice.value === DEFAULT_VALUE &&
      selectedRooms.value === DEFAULT_VALUE &&
      selectedGuests.value === DEFAULT_VALUE
    ) {
      cb(array);
    } else {
      cb(array, []);
    }
  }));

  resetForm(cb, array);
};

export {filterByAll};
