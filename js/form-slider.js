const sliderElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('[name="price"]');
const typeElement = document.querySelector('[name="type"]');
const typeOption = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

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

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

typeElement.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(typeOption[evt.target.value]);
});

priceElement.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
});
