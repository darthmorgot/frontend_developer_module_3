const filters = document.querySelector('.map__filters');

/**
 * Функция для сброса формы фильтров и дополнительными параметрами.
 */
const resetForm = (cb, param) => {
  const resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', () => {
    filters.reset();
    cb(param);
  });
};

export {resetForm};
