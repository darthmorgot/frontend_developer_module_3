function getRandomInteger(from = 0, to = 10) {
  if (typeof from === 'string' || typeof to === 'string') {
    return 'Необходимо ввести число';
  }

  if (from < 0 || to < 0) {
    return 'Необходимо число больше или равное нулю';
  }

  return Math.floor(Math.random() * (to - from + 1) + from);
}

function getRandomFloatingPointNumber(from, to) {
  return Math.random() * (to - from + 1) + from;
}

getRandomInteger(2, 8);
getRandomFloatingPointNumber(5, 9);
