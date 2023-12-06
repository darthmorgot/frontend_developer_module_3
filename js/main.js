import {deactivateForm, activateForm} from './manage-form.js'
import {createListSimilarOffers} from './generate-similar-offers.js';

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.addEventListener('click', (evt) => {
  evt.preventDefault();
  activateForm();
}, {once: true});

deactivateForm();
createListSimilarOffers();
