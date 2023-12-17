import './form-slider.js';

const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__validate',
  errorTextParent: 'ad-form__validate',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

const typeField = form.querySelector('#type');
const priceField = form.querySelector('#price');
const typeOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

/**
 * Функция для получения сообщения об ошибке.
 * @returns {`Не меньше ${*}`} Строка сообщения об ошибке.
 */
const getTypeErrorMessage = () => {
  const typeSelected = typeField.value;
  return `Не меньше ${typeOption[typeSelected]}`;
}

/**
 * Функция для валидации поля цены за ночь в зависимости от типа жилья.
 */
const validatePrice = () => {
  pristine.addValidator(priceField, (value) => {
    const typeSelected = typeField.value;
    return value >= typeOption[typeSelected];
  }, getTypeErrorMessage);
  pristine.addValidator(priceField, (value) => {
    return value <= 100000;
  }, `Не больше 100000`);

  typeField.addEventListener('change', (evt) => {
    priceField.placeholder = typeOption[evt.target.value];
    pristine.validate(priceField);
  });
};

export {validatePrice}
