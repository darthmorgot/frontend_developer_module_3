import {synchronizeTimeInTimeOut} from './validate-timein-timeout.js';
import {validatePrice} from './validate-price.js';
import {validateRoomsPlaces} from './validate-rooms-places.js';
import {sendData} from './api.js';
import {resetMapMainMarker} from './render-map.js';

const body = document.querySelector('body');
const form = document.querySelector('.ad-form');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const filters = document.querySelector('.map__filters');

const pristine = new Pristine(form, {
  classTo: 'ad-form__validate',
  errorTextParent: 'ad-form__validate',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

validatePrice();
validateRoomsPlaces();
synchronizeTimeInTimeOut();

/**
 * Функция для закрытия сообщения.
 * @param element Сообщения, которое надо закрыть.
 */
const deleteMessage = (element) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      element.remove();
    }
  }, {once: true});
  document.addEventListener('click', () => {
    element.remove();
  }, {once: true});
};

/**
 * Функция, показывающая сообщение об ошибке при заполнении формы.
 */
const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  }, {once: true});

  deleteMessage(errorMessage);

  body.append(errorMessage);
};

/**
 * Функция, показывающая сообщение об успешной отправке формы.
 */
const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);

  deleteMessage(successMessage);

  body.append(successMessage);
};

/**
 * Функция валидации и отпраки формы.
 */
const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      sendData(
        () => {
          showSuccessMessage();
          form.submit();
          form.reset();
          filters.reset();
          resetMapMainMarker();
        },
        () => {
          showErrorMessage();
        },
        new FormData(evt.target)
      );
    }
  });
};

/**
 * Функция для сброса формы фильтров.
 */
const resetForm = () => {
  const resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', () => {
    filters.reset();
  });
};

export {setUserFormSubmit, resetForm};
