const timeField = document.querySelector('.ad-form__element--time');
const timeIn = timeField.querySelector('#timein');
const timeOut = timeField.querySelector('#timeout');

/**
 * Функция для синхронизации полей времени заезда и выезда.
 */
const synchronizeTimeInTimeOut = () => {
  timeField.addEventListener('change', (evt) => {
    evt.target.name === 'timein' ? timeOut.value = timeIn.value : timeIn.value = timeOut.value;
  });
};

export {synchronizeTimeInTimeOut}
