import {activateForm, deactivateForm} from './manage-form.js';
import {renderSimilarOffer} from './generate-offer.js';
import {getData} from './api.js';
import {showAlert, getRandomInteger} from './utils.js';
import {filterByAll} from './filter-offer.js';
import {resetForm} from './reset-form.js';

const OFFER_COUNT = 10;
const addressField = document.querySelector('#address');
const startCount = getRandomInteger(0, 40);

deactivateForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.681729,
    lng: 139.753927,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: 35.681729,
    lng: 139.753927,
  },
  {
    draggable: true,
    icon: mainPinIcon,
    riseOnHover: true,
  },
);

/**
 * Функция для скрытия попапа, и возврата карты и адресного маркера в исходное положение.
 * @param marker Объект маркера.
 */
const resetMapMainMarker = (marker) => {
  if (marker) {
    const popup = document.querySelector('.leaflet-popup');
    if (popup) marker.closePopup();
  }

  map.setView({
    lat: 35.681729,
    lng: 139.753927,
  }, 13);

  mainPinMarker.setLatLng({
    lat: 35.681729,
    lng: 139.753927,
  });
};

/**
 * Функция для вывода интерактивной карты на страницу.
 */
const renderMap = () => {
  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const lat = evt.target.getLatLng().lat;
    const lng = evt.target.getLatLng().lng;
    addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });
};

/**
 * Функция для создания маркера объявления.
 * @param item Объект объявления.
 */
const createMarker = (item) => {
  const {lat, lng} = item.location;
  const {author, offer} = item;

  const marker = L.marker(
    {
      lat: lat.toFixed(5),
      lng: lng.toFixed(5),
    },
    {
      icon: pinIcon,
    }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(renderSimilarOffer({author, offer}));

  resetForm(resetMapMainMarker, marker);
};

/**
 * Функция для вывода маркеров объявлений на карте.
 * @param offers
 * @param checkedOffers
 */
const renderMarkers = (offers, checkedOffers) => {
  const offerSlice = offers.slice(startCount, startCount + OFFER_COUNT);

  if (checkedOffers) {
    markerGroup.clearLayers();
    checkedOffers.forEach((item) => createMarker(item));
  } else {
    markerGroup.clearLayers();
    offerSlice.forEach((item) => createMarker(item));
  }
};

getData(
  (offers) => {
    renderMarkers(offers);

    filterByAll(offers, renderMarkers);
  },
  (err) => {
    showAlert(err);
  }
);

export {renderMap, resetMapMainMarker};
