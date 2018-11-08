import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const STANDARD_HEIGHT = 375;
const CURRENT_WIDTH = width;
const CURRENT_HEIGHT = height;
const K = CURRENT_HEIGHT / STANDARD_HEIGHT;

const USE_FOR_BIGGER_SIZE = true;

export function dySize(size) {
  return K * size;
}

export function get(str) {
  if (str === 'width') return CURRENT_WIDTH;
  else if (str === 'height') return CURRENT_HEIGHT;
  return 0;
}

export function getFontSize(size) {
  if (USE_FOR_BIGGER_SIZE || CURRENT_HEIGHT < STANDARD_HEIGHT) {
    const newSize = dySize(size);
    return newSize;
  }
  return size;
}
