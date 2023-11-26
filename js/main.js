import {getRandomInteger, getRandomFloatingPointNumber} from './randomNumbers.js';
import {TYPES, FEATURES, PHOTOS, HOURS} from './data.js';

const ADVERTISEMENT_COUNT = 10;

const getRandomFeaturesElement = () => {
  return FEATURES[getRandomInteger(0, FEATURES.length - 1)];
};

const getRandomPhotosElement = () => {
  return PHOTOS[getRandomInteger(0, PHOTOS.length - 1)];
};

const createAdvertisement = () => {
  let num = getRandomInteger(1, 10);
  let coordOne = getRandomFloatingPointNumber(35.65000, 35.70000, 5);
  let coordTwo = getRandomFloatingPointNumber(139.70000, 139.80000, 5);
  let type = TYPES[getRandomInteger(0, TYPES.length - 1)];
  let hour = HOURS[getRandomInteger(0, 2)];
  let features = Array.from({length: getRandomInteger(1, FEATURES.length)}, getRandomFeaturesElement);
  let photos = Array.from({length: getRandomInteger(1, PHOTOS.length)}, getRandomPhotosElement);

  return {
    author: {
      avatar: `img/avatars/user${num < 10 ? '0' + num : num}.png`
    },
    offer: {
      title: `Ads heading ${num}`,
      address: `${coordOne}, ${coordTwo}`,
      price: getRandomInteger(0, 100000),
      type: type,
      rooms: getRandomInteger(1, 100),
      guests: getRandomInteger(1, 100),
      checkin: hour,
      checkout: hour,
      features: [...new Set(features)],
      description: `Великолепная ${type} в центре Токио. Подходит как туристам, так и бизнесменам. Квартира' +
        ' полностью укомплектована и недавно отремонтирована.`,
      photos: [...new Set(photos)]
    },
    location: {
      lat: coordOne,
      lng: coordTwo
    }
  }
};

const listAdvertisements = Array.from({length: ADVERTISEMENT_COUNT}, createAdvertisement);

console.log(listAdvertisements);
