import {deactivateForm, activateForm} from './manage-form.js';
import {renderListSimilarOffers} from './generate-similar-offers.js';
import {formValidate} from './validate-form.js';

deactivateForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
  lat: 35.681729,
  lng: 139.753927,
}, 10);

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

const marker = L.marker(
  {
    lat: 35.681729,
    lng: 139.753927,
  },
  {
    draggable: true,
    icon: mainPinIcon
  },
);

marker.addTo(map);

marker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});

// renderListSimilarOffers();
formValidate();
