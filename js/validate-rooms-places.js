const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__validate',
  errorTextParent: 'ad-form__validate',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});

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
/**
 * Функция для валидации полей количества комнат и количества мест.
 */
const validateRoomsPlaces = () => {
  pristine.addValidator(roomNumber, validateRoomNumber, getErrorMessage);
  pristine.addValidator(capacity, validateRoomNumber, getErrorMessage);
};

export {validateRoomsPlaces}
