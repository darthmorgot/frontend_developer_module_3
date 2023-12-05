/**
 * Функция, позволяющая получать элементы формы, собирать их в массивы,
 * добавлять класс и атрибут элементам формы и удалять их.
 * @param flag Булево выражение, true - добавление класса или атрибута,
 * false - удаление класса или атрибута.
 */
const manageForm = (flag) => {
  const adForm = document.querySelector('.ad-form');
  const adFormElements = adForm.querySelectorAll('fieldset');

  const mapFilter = document.querySelector('.map__filters');
  const mapFilterElements = mapFilter.querySelectorAll('[id^="housing"]');

  const formArray = [adForm, mapFilter];
  const formElementsArray = [adFormElements, mapFilterElements];

  formElementsArray.forEach((element) => {
    element.forEach((el) => {
      el.disabled = !!flag;
    });
  });

  formArray.forEach((element) => {
    flag ? element.classList.add('ad-form--disabled') : element.classList.remove('ad-form--disabled');
  });
};

/**
 * Функция переводит формы в неактивное состояние
 */
const deactivateForm = () => {
  manageForm(true);
};

/**
 * Функция переводит формы в активное состояние
 */
const activateForm = () => {
  manageForm(false);
};

export {deactivateForm, activateForm}
