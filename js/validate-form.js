const body = document.querySelector('body');
const form = document.querySelector('.ad-form');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const pristine = new Pristine(form, {
  classTo: 'ad-form__validate',
  errorTextParent: 'ad-form__validate',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

pristine.addValidator(form.querySelector('#price'), (value) => {
  return value >= 0 && value <= 100000;
}, 'От 0 до 100000');

const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const roomNumberOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

/**
 * Функция для валидации выбранных полей.
 * @returns {*} true / false
 */
const validateRoomNumber = () => {
  return roomNumberOption[roomNumber.value].includes(capacity.value);
};

/**
 * Функция для выбора сообщения об ошибке.
 * @returns {string} Один из вариантов текста об ошибке.
 */
const getErrorMessage = () => {
  switch (roomNumber.value) {
    case '1':
      return '1 комната для 1 гостя';
    case '2':
      return '2 комнаты для 1 или 2 гостей';
    case '3':
      return '3 комнаты для 1, 2 или 3 гостей';
    case '100':
      return 'не для гостей';
  }
}

pristine.addValidator(roomNumber, validateRoomNumber, getErrorMessage);
pristine.addValidator(capacity, validateRoomNumber, getErrorMessage);

/**
 * Функция для закрытия сообщения.
 * @param element Элемент сообщения, которое надо закрыть.
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
  form.reset();
};

/**
 * Функция валидации формы.
 */
const formValidate = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      showSuccessMessage();
    } else {
      showErrorMessage();
    }
  });
};

export {formValidate};
