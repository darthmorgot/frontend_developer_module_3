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

/**
 * Функция, показывающая сообщение об успешной отправке формы.
 */
const showError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    errorElement.remove();
  }, {once: true});
  form.append(errorElement);
};

/**
 * Функция, показывающая сообщение об ошибке при заполнении формы.
 */
const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      successElement.remove();
    }
  }, {once: true});
  document.addEventListener('click', () => {
    successElement.remove();
  }, {once: true});
  form.append(successElement);
  form.reset();
};

const formValidate = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      showSuccess();
    } else {
      showError();
    }
  });
};

export {formValidate};
