import {getRandomInteger, getRandomFloatingPointNumber} from './randomNumbers.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const HOURS = ['12:00', '13:00', '14:00'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
]

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
  let price = getRandomInteger(10000, 100000);
  let type = TYPES[getRandomInteger(0, TYPES.length - 1)];
  let rooms = getRandomInteger(1, 100);
  let guests = getRandomInteger(1, 100);
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
      price: price,
      type: type,
      rooms: rooms,
      guests: guests,
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

const listAdvertisements = Array.from({length: 10}, createAdvertisement);

console.log(listAdvertisements);
