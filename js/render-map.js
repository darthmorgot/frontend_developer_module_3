import {activateForm, deactivateForm} from './manage-form.js';
import {createListOffers} from './create-offers.js';
import {renderSimilarOffer} from './generate-offer.js';
import {getData} from './api.js';

const OFFER_COUNT = 10;
const addressField = document.querySelector('#address');
const arrayOffers = createListOffers(OFFER_COUNT);

deactivateForm();

/**
 * Функция для вывода интерактивной карты на страницу.
 */
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
        lat,
        lng,
      },
      {
        icon: pinIcon,
      }
    );

    marker
      .addTo(markerGroup)
      .bindPopup(renderSimilarOffer({author, offer}));
  };

  arrayOffers.forEach((item) => {
    createMarker(item);
  });

  getData((offers) => {
    console.log(offers);
  })
};

export {renderMap};
