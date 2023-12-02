import {createListOffers} from './create-offers.js';

const OFFER_COUNT = 1;
const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const entryPoint = document.querySelector('#map-canvas');
const similarOffersTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const listSimilarOffers = createListOffers(OFFER_COUNT);

listSimilarOffers.forEach(({author, offer, location}) => {
  const offerElement = similarOffersTemplate.cloneNode(true);

  const features = offerElement.querySelector('.popup__features');
  const featureList = features.querySelectorAll('.popup__feature');
  const modifiers = offer.features.map((param) => 'popup__feature--' + param);

  const photos = offerElement.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');

  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = TYPES[offer.type];
  offerElement.querySelector('.popup__text--capacity')
    .textContent = `${offer.rooms} комнат(ы) для ${offer.guests} гостей(я)`;
  offerElement.querySelector('.popup__text--time')
    .textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  featureList.forEach((featureListItem) => {
    if (!modifiers.includes(featureListItem.classList[1])) {
      featureListItem.remove();
    }
  });

  offer.photos.forEach((item) => {
    const photoClone = photo.cloneNode();
    photoClone.src = item;
    photos.append(photoClone);
  });
  photo.remove();

  offerElement.querySelector('.popup__description').textContent = offer.description;
  offerElement.querySelector('.popup__avatar').src = author.avatar;

  entryPoint.append(offerElement);
});
