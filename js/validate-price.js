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
const sliderElement = form.querySelector('.ad-form__slider');

/**
 * Конфиг для слайдера выбора цены за ночь
 */
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1000,
  connect: 'lower',
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

priceField.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
});

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

  sliderElement.noUiSlider.on('update', () => {
    priceField.value = sliderElement.noUiSlider.get();
    pristine.validate(priceField);
  });

  typeField.addEventListener('change', (evt) => {
    priceField.placeholder = typeOption[evt.target.value];
    sliderElement.noUiSlider.set(typeOption[evt.target.value]);
    pristine.validate(priceField);
  });
};

export {validatePrice}
