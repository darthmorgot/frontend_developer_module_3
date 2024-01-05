import {resetForm} from './reset-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const inputAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview');
const inputPhoto = document.querySelector('.ad-form__input');
const containerPhoto = document.querySelector('.ad-form__photo');

/**
 * Функция для просмотра выбранной фотографии.
 * @param input Элемент разметки для выбора фотографии.
 * @param preview Элемент разметки для просмотра выбранной фотографии.
 * @param container Элемент разметки, где размещаются выбранные фотографии.
 * @param flag Строка, указывающая назначение фотографии.
 */
const previewPhoto = (input, preview, container, flag) => {
  input.addEventListener('change', () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
    if (matches) {
      if (flag === 'avatar') preview.firstElementChild.src = URL.createObjectURL(file);
      if (flag === 'photo') {
        const imgPhoto = `<img src="${URL.createObjectURL(file)}" width="100" height="100" alt="">`;
        container.style.display = 'flex';
        container.insertAdjacentHTML('beforeend', imgPhoto);
      }
    }
  });
};

/**
 * Функция для удаления выбранных фотографий.
 * @param param Массив параметров.
 */
const resetPhoto = (param) => {
  param[0].firstElementChild.src = 'img/muffin-grey.svg';
  if (param[1].children.length) {
    let array = Array.from(param[1].children);
    array.forEach((item) => item.remove());
  }
};

const uploadPhotos = () => {
  previewPhoto(inputAvatar, previewAvatar, containerPhoto, 'avatar');
  previewPhoto(inputPhoto, containerPhoto, containerPhoto, 'photo');

  resetForm(resetPhoto, [previewAvatar, containerPhoto]);
};

export {uploadPhotos};
