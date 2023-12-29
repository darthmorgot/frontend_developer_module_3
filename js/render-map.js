import {activateForm, deactivateForm} from './manage-form.js';
import {renderSimilarOffer} from './generate-offer.js';
import {getData} from './api.js';
import {showAlert, getRandomInteger} from './utils.js';

const OFFER_COUNT = 10;
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
 * Функция для возврата карты и адресного маркера в исходное положение.
 */
const resetMapMainMarker = () => {
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
  const startCount = getRandomInteger(0, 40);

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const lat = evt.target.getLatLng().lat;
    const lng = evt.target.getLatLng().lng;
    addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });

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

    resetButton.addEventListener('click', () => {
      const popup = document.querySelector('.leaflet-popup');
      if (popup) marker.closePopup();

      resetMapMainMarker();
    });
  };

  getData(
    (offers) => {
      const offerSlice = offers.slice(startCount, startCount + OFFER_COUNT);
      const selectedType = document.querySelector('#housing-type');
      const selectedPrice = document.querySelector('#housing-price');
      const selectedRoom = document.querySelector('#housing-rooms');
      const selectedGuests = document.querySelector('#housing-guests');
      const selectedFeature = document.querySelector('#housing-features');

      offerSlice.forEach((item) => createMarker(item));

      selectedType.addEventListener('change', () => {
        const offerByType = offers.filter((item) => item.offer.type === selectedType.value);
        markerGroup.clearLayers();
        offerByType.slice(0, 10).forEach((item) => createMarker(item));
        if (selectedType.value === 'any') offerSlice.forEach((item) => createMarker(item));
      });

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
        offerByPrice.forEach((item) => createMarker(item));
      });

      selectedRoom.addEventListener('change', () => {
        const offerByRoom = offers.filter((item) => item.offer.rooms === parseInt(selectedRoom.value));
        markerGroup.clearLayers();
        offerByRoom.slice(0, 10).forEach((item) => createMarker(item));
        if (selectedRoom.value === 'any') offerSlice.forEach((item) => createMarker(item));
      });

      selectedGuests.addEventListener('change', () => {
        const offerByGuests = offers.filter((item) => item.offer.guests === parseInt(selectedGuests.value));
        markerGroup.clearLayers();
        offerByGuests.slice(0, 10).forEach((item) => createMarker(item));
        if (selectedGuests.value === 'any') offerSlice.forEach((item) => createMarker(item));
      });

      selectedFeature.addEventListener('click', (evt) => {
        let selectedFeatureValue;
        if (evt.target.value) {
          if (evt.target.checked) {
            selectedFeature.setAttribute('checked', true);
            selectedFeatureValue = evt.target.value;
            const offerByFeature = offers.filter((item) => {
              if (item.offer.features) return item.offer.features.indexOf(selectedFeatureValue) !== -1;
            });
            markerGroup.clearLayers();
            offerByFeature.slice(0, 10).forEach((item) => createMarker(item));
          } else {
            markerGroup.clearLayers();
            offerSlice.forEach((item) => createMarker(item));
          }
        }
      });
    },
    (err) => {
      showAlert(err);
    }
  );
};

export {renderMap, resetMapMainMarker};
