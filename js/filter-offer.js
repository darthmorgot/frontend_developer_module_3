import {debounce} from './utils.js';

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
const selectedFeature = formFilters.querySelector('#housing-features');

/**
 * Функция для проверки объявлений по типу жилья.
 * @param offer Объект объявления.
 * @param typeValue Значение типа жилья.
 */
const checkByType = (offer, typeValue) => {
  return typeValue === DEFAULT_VALUE || offer.offer.type === typeValue;
};

/**
 * Функция для фильтрации объявлений по цене на ночь.
 * @param array Массив всех объявлений.
 * @param arraySlice Массив из 10 случайно выбранных объявлений.
 * @param layer Слой карты, куда добавляются маркеры объявлений.
 * @param cb Функция для создания и добавления маркеров на карту.
 */
const checkByPrice = (array, arraySlice, layer, cb) => {
  selectedPrice.addEventListener('change', () => {
    let offerByPrice;
    switch (selectedPrice.value) {
      case 'middle':
        offerByPrice = array.filter((item) => item.offer.price >= PRICES.middle && item.offer.price <= PRICES.high).slice(0, 10);
        break;
      case 'low':
        offerByPrice = array.filter((item) => item.offer.price < PRICES.middle).slice(0, 10);
        break;
      case 'high':
        offerByPrice = array.filter((item) => item.offer.price > PRICES.high).slice(0, 10);
        break;
      default:
        offerByPrice = arraySlice;
    }
    layer.clearLayers();
    offerByPrice.forEach((item) => cb(item));
  });
};

/**
 * Функция для фильтрации объявлений по количеству комнат.
 * @param array Массив всех объявлений.
 * @param arraySlice Массив из 10 случайно выбранных объявлений.
 * @param layer Слой карты, куда добавляются маркеры объявлений.
 * @param cb Функция для создания и добавления маркеров на карту.
 */
const checkByRooms = (array, arraySlice, layer, cb) => {
  selectedRooms.addEventListener('change', () => {
    const offerByRoom = array.filter((item) => item.offer.rooms === parseInt(selectedRooms.value));
    layer.clearLayers();
    offerByRoom.slice(0, 10).forEach((item) => cb(item));
    if (selectedRooms.value === 'any') arraySlice.forEach((item) => cb(item));
  });
};

/**
 * Функция для фильтрации объявлений по количеству гостей.
 * @param array Массив всех объявлений.
 * @param arraySlice Массив из 10 случайно выбранных объявлений.
 * @param layer Слой карты, куда добавляются маркеры объявлений.
 * @param cb Функция для создания и добавления маркеров на карту.
 */
const checkByGuests = (array, arraySlice, layer, cb) => {
  selectedGuests.addEventListener('change', () => {
    const offerByGuests = array.filter((item) => item.offer.guests === parseInt(selectedGuests.value));
    layer.clearLayers();
    offerByGuests.slice(0, 10).forEach((item) => cb(item));
    if (selectedGuests.value === 'any') arraySlice.forEach((item) => cb(item));
  });
};

/**
 * Функция для фильтрации объявлений по типу и количеству удобств.
 * @param array Массив всех объявлений.
 * @param arraySlice Массив из 10 случайно выбранных объявлений.
 * @param layer Слой карты, куда добавляются маркеры объявлений.
 * @param cb Функция для создания и добавления маркеров на карту.
 */
const checkByFeature = (array, arraySlice, layer, cb) => {
  let featureList = [];
  let checkedFeature = [];

  /**
   * Функция для вычисления веса объявления по количеству удобств.
   * @param offer Объект объявления.
   * @returns {number} Вес объявления.
   */
  const getOfferRank = (offer) => {
    let rank = 0;

    for (const feature of featureList) {
      if (offer.offer.features && offer.offer.features.includes(feature)) {
        rank += 1;
      }
    }

    return rank;
  };

  /**
   * Функция для сравнения веса объявлений.
   * @param offerA Первое объявление.
   * @param offerB Второе объявление.
   * @returns {number} Число, указывающее место объявления в массиве.
   */
  const compareOffers = (offerA, offerB) => {
    const rankA = getOfferRank(offerA);
    const rankB = getOfferRank(offerB);

    return rankB - rankA;
  };

  selectedFeature.addEventListener('change', (evt) => {
    const offerByFeature = array.slice();
    if (evt.target.value) {
      if (evt.target.checked) {
        selectedFeature.setAttribute('checked', 'true');
        featureList.push(evt.target.value);
        checkedFeature.push('check');

        layer.clearLayers();
        offerByFeature.sort(compareOffers).slice(0, 10).forEach((item) => cb(item));
      } else if (!evt.target.checked) {
        checkedFeature.pop();
      }
      if (checkedFeature.length === 0) {
        layer.clearLayers();
        arraySlice.forEach((item) => cb(item));
      }
    }
  });
};

const getCheckedOffers = (array) => {
  const checkedOffers = [];

  for (let arrayElement of array) {
    if (checkByType(arrayElement, selectedType.value)) {
      checkedOffers.push(arrayElement);
    }
  }

  return checkedOffers;
};

const filterByAll = (array, arraySlice, layer, cb) => {
  formFilters.addEventListener('change', debounce(() => {
    layer.clearLayers();
    getCheckedOffers(array).slice(0, 10).forEach((item) => cb(item));
  }));

  // checkByType(array, arraySlice, layer, cb);
  checkByPrice(array, arraySlice, layer, cb);
  checkByRooms(array, arraySlice, layer, cb);
  checkByGuests(array, arraySlice, layer, cb);
  checkByFeature(array, arraySlice, layer, cb);
};

export {filterByAll};
