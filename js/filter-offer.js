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

// /**
//  * Функция для фильтрации объявлений по типу и количеству удобств.
//  * @param array Массив всех объявлений.
//  * @param arraySlice Массив из 10 случайно выбранных объявлений.
//  * @param layer Слой карты, куда добавляются маркеры объявлений.
//  * @param cb Функция для создания и добавления маркеров на карту.
//  */
// const checkByFeature = (array, arraySlice, layer, cb) => {
//   let featureList = [];
//   let checkedFeature = [];
//
//   /**
//    * Функция для вычисления веса объявления по количеству удобств.
//    * @param offer Объект объявления.
//    * @returns {number} Вес объявления.
//    */
//   const getOfferRank = (offer) => {
//     let rank = 0;
//
//     for (const feature of featureList) {
//       if (offer.offer.features && offer.offer.features.includes(feature)) {
//         rank += 1;
//       }
//     }
//
//     return rank;
//   };
//
//   /**
//    * Функция для сравнения веса объявлений.
//    * @param offerA Первое объявление.
//    * @param offerB Второе объявление.
//    * @returns {number} Число, указывающее место объявления в массиве.
//    */
//   const compareOffers = (offerA, offerB) => {
//     const rankA = getOfferRank(offerA);
//     const rankB = getOfferRank(offerB);
//
//     return rankB - rankA;
//   };
//
//   selectedFeature.addEventListener('change', (evt) => {
//     const offerByFeature = array.slice();
//     if (evt.target.value) {
//       if (evt.target.checked) {
//         selectedFeature.setAttribute('checked', 'true');
//         featureList.push(evt.target.value);
//         checkedFeature.push('check');
//
//         layer.clearLayers();
//         offerByFeature.sort(compareOffers).slice(0, 10).forEach((item) => cb(item));
//       } else if (!evt.target.checked) {
//         checkedFeature.pop();
//       }
//       if (checkedFeature.length === 0) {
//         layer.clearLayers();
//         arraySlice.forEach((item) => cb(item));
//       }
//     }
//   });
// };

const checkByFeature = (offer, featureValue) => {
  if (offer.offer.features) {
    return offer.offer.features.includes(featureValue);
  }
};

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
      checkByGuests(arrayElement, selectedGuests.value)
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

const filterByAll = (array, arraySlice, layer, cb) => {
  formFilters.addEventListener('change', debounce(() => {
    let arrCheckedOffers = getCheckedOffers(array);
    layer.clearLayers();
    if (arrCheckedOffers.length !== 0) {
      arrCheckedOffers.slice(0, 10).forEach((item) => cb(item));
    } else {
      arrCheckedOffers.slice(0, 10).forEach((item) => cb(item));
      // arraySlice.forEach((item) => cb(item));
    }
  }));

  // checkByFeature(array, arraySlice, layer, cb);
};

export {filterByAll};
