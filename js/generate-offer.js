const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

/**
 * Функция выводит на страницу одно объявление.
 */
const renderSimilarOffer = ({author, offer}) => {
  const similarOffersTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const offerElement = similarOffersTemplate.cloneNode(true);

  const features = offerElement.querySelector('.popup__features');
  const featureList = features.querySelectorAll('.popup__feature');

  const photos = offerElement.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');

  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;

  if (offer.price) {
    offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  } else {
    offerElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  offerElement.querySelector('.popup__type').textContent = TYPES[offer.type];

  if (offer.rooms && offer.guests) {
    offerElement.querySelector('.popup__text--capacity')
      .textContent = `${offer.rooms} комнат(ы) для ${offer.guests} гостей(я)`;
  } else {
    offerElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (offer.checkin && offer.checkout) {
    offerElement.querySelector('.popup__text--time')
      .textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    offerElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  if (offer.features) {
    const modifiers = offer.features.map((param) => 'popup__feature--' + param);
    featureList.forEach((featureListItem) => {
      if (!modifiers.includes(featureListItem.classList[1])) {
        featureListItem.remove();
      }
    });
  } else {
    features.classList.add('hidden');
  }

  if (offer.photos) {
    offer.photos.forEach((item) => {
      const photoClone = photo.cloneNode();
      photoClone.src = item;
      photos.append(photoClone);
    });
  }
  photo.remove();

  offerElement.querySelector('.popup__description').textContent = offer.description;

  if (author.avatar) {
    offerElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    offerElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  return offerElement;
};

export {renderSimilarOffer}
