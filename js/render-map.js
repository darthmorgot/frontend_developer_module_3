import {activateForm, deactivateForm} from './manage-form.js';
import {renderSimilarOffer} from './generate-offer.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';

const addressField = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

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
 * Функция для возврата адресного маркера в исходное положение.
 */
const resetMainMarker = () => {
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

  const markerGroup = L.layerGroup().addTo(map);

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
  };

  getData(
    (offers) => {
      offers.forEach((item) => createMarker(item));
    },
    (err) => {
      showAlert(err);
    }
  );

  resetButton.addEventListener('click', () => {
    const popup = document.querySelector('.leaflet-popup');
    if (popup) popup.remove();

    resetMainMarker();
  });
};

export {renderMap, resetMainMarker};
