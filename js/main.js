import {deactivateForm, activateForm} from './manage-form.js';
import {renderListSimilarOffers} from './generate-similar-offers.js';
import {formValidate} from './validate-form.js';

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.addEventListener('click', (evt) => {
  evt.preventDefault();
  activateForm();
}, {once: true});

deactivateForm();
renderListSimilarOffers();
formValidate();
