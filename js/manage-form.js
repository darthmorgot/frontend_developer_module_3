const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const adFormElements = adForm.querySelectorAll('fieldset');
const mapFilterElements = mapFilter.querySelectorAll('[id^="housing"]');

const deactivateForm = () => {
  adFormElements.forEach((element) => {
    element.disabled = true;
  });

  mapFilterElements.forEach((element) => {
    element.disabled = true;
  });

  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');
};

const activateForm = () => {
  adFormElements.forEach((element) => {
    element.disabled = false;
  });

  mapFilterElements.forEach((element) => {
    element.disabled = false;
  });

  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');
};

export {deactivateForm, activateForm}
