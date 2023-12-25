/**
 * Функция для запроса данных с сервера.
 * @param onSuccess Функция для обработки данных при успешном выполнении запроса.
 */
const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers);
    })
};

/**
 * Функция для отправки данных на сервер.
 * @param onSuccess Функция, вызываемая при успешной отправке данных.
 * @param onFail Функция, вызываемая при неудачной отправке данных.
 * @param body Данные, отправляемые на сервер.
 */
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academ/keksobooking',
    {
      method: 'POST',
      body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => onFail('Не удалось отправить форму. Попробуйте ещё раз'))
};

export {getData, sendData};
