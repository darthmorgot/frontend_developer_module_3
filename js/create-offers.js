import {getRandomInteger, getRandomFloatingPointNumber, getRandomArrayElement, createArray} from './utils.js';
import {TYPES, FEATURES, PHOTOS, HOURS} from './data.js';

const getRandomFeaturesElement = () => getRandomArrayElement(FEATURES);

const getRandomPhotosElement = () => getRandomArrayElement(PHOTOS);

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
  }
};

const createListOffers = (count) => createArray(count, createOffer);

export {createListOffers}
