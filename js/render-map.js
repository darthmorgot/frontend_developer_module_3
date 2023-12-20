import {activateForm, deactivateForm} from './manage-form.js';
import {createListOffers} from './create-offers.js';
import {renderListSimilarOffers} from './generate-similar-offers.js';

const OFFER_COUNT = 10;
const addressField = document.querySelector('#address');
const arrayOffers = createListOffers(OFFER_COUNT);

deactivateForm();
renderListSimilarOffers(arrayOffers);

const renderMap = () => {
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

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const lat = evt.target.getLatLng().lat;
    const lng = evt.target.getLatLng().lng;
    addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  });

  arrayOffers.forEach(({location}) => {
    const marker = L.marker({
      lat: location.lat,
      lng: location.lng,
    });

    marker.addTo(map);
  });
};

export {renderMap};
