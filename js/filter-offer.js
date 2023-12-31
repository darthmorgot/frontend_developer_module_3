/**
 * Функция для фильтрации объявлений по типу жилья.
 * @param offers Массив всех объявлений.
 * @param offerSlice Массив из 10 случайно выбранных объявлений.
 * @param markerGroup Слой карты, куда добавляются маркеры объявлений.
 * @param cb Функция для создания и добавления маркеров на карту.
 */
const filterByType = (offers, offerSlice, markerGroup, cb) => {
  const selectedType = document.querySelector('#housing-type');

  selectedType.addEventListener('change', () => {
    const offerByType = offers.filter((item) => item.offer.type === selectedType.value);
    markerGroup.clearLayers();
    offerByType.slice(0, 10).forEach((item) => cb(item));
    if (selectedType.value === 'any') offerSlice.forEach((item) => cb(item));
  });
};

/**
 * Функция для фильтрации объявлений по цене на ночь.
 * @param offers Массив всех объявлений.
 * @param offerSlice Массив из 10 случайно выбранных объявлений.
 * @param markerGroup Слой карты, куда добавляются маркеры объявлений.
 * @param cb Функция для создания и добавления маркеров на карту.
 */
const filterByPrice = (offers, offerSlice, markerGroup, cb) => {
  const selectedPrice = document.querySelector('#housing-price');

  selectedPrice.addEventListener('change', () => {
    let offerByPrice;
    switch (selectedPrice.value) {
      case 'middle':
        offerByPrice = offers.filter((item) => item.offer.price >= 10000 && item.offer.price <= 50000).slice(0, 10);
        break;
      case 'low':
        offerByPrice = offers.filter((item) => item.offer.price < 10000).slice(0, 10);
        break;
      case 'high':
        offerByPrice = offers.filter((item) => item.offer.price > 50000).slice(0, 10);
        break;
      default:
        offerByPrice = offerSlice;
    }
    markerGroup.clearLayers();
    offerByPrice.forEach((item) => cb(item));
  });
};

/**
 * Функция для фильтрации объявлений по количеству комнат.
 * @param offers Массив всех объявлений.
 * @param offerSlice Массив из 10 случайно выбранных объявлений.
 * @param markerGroup Слой карты, куда добавляются маркеры объявлений.
 * @param cb Функция для создания и добавления маркеров на карту.
 */
const filterByRooms = (offers, offerSlice, markerGroup, cb) => {
  const selectedRooms = document.querySelector('#housing-rooms');

  selectedRooms.addEventListener('change', () => {
    const offerByRoom = offers.filter((item) => item.offer.rooms === parseInt(selectedRooms.value));
    markerGroup.clearLayers();
    offerByRoom.slice(0, 10).forEach((item) => cb(item));
    if (selectedRooms.value === 'any') offerSlice.forEach((item) => cb(item));
  });
};

/**
 * Функция для фильтрации объявлений по количеству гостей.
 * @param offers Массив всех объявлений.
 * @param offerSlice Массив из 10 случайно выбранных объявлений.
 * @param markerGroup Слой карты, куда добавляются маркеры объявлений.
 * @param cb Функция для создания и добавления маркеров на карту.
 */
const filterByGuests = (offers, offerSlice, markerGroup, cb) => {
  const selectedGuests = document.querySelector('#housing-guests');

  selectedGuests.addEventListener('change', () => {
    const offerByGuests = offers.filter((item) => item.offer.guests === parseInt(selectedGuests.value));
    markerGroup.clearLayers();
    offerByGuests.slice(0, 10).forEach((item) => cb(item));
    if (selectedGuests.value === 'any') offerSlice.forEach((item) => cb(item));
  });
};

/**
 * Функция для фильтрации объявлений по типу и количеству удобств.
 * @param offers Массив всех объявлений.
 * @param offerSlice Массив из 10 случайно выбранных объявлений.
 * @param markerGroup Слой карты, куда добавляются маркеры объявлений.
 * @param cb Функция для создания и добавления маркеров на карту.
 */
const filterByFeature = (offers, offerSlice, markerGroup, cb) => {
  const selectedFeature = document.querySelector('#housing-features');
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
      if (offer.offer.features && offer.offer.features.indexOf(feature) !== -1) {
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

  selectedFeature.addEventListener('click', (evt) => {
    const offerByFeature = offers.slice();
    if (evt.target.value) {
      if (evt.target.checked) {
        selectedFeature.setAttribute('checked', true);
        featureList.push(evt.target.value);
        checkedFeature.push('check');

        markerGroup.clearLayers();
        offerByFeature.sort(compareOffers).slice(0, 10).forEach((item) => cb(item));
      } else if (!evt.target.checked) {
        checkedFeature.pop();
      }
      if (checkedFeature.length === 0) {
        markerGroup.clearLayers();
        offerSlice.forEach((item) => cb(item));
      }
    }
  });
};

export {filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeature};
