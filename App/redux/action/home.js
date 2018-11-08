import * as types from '../types';
import * as Service from '../../service';
// const sample_ticker = 'Animated provides several animation types, the most commonly used one being Animated.timing(). It supports animating a value over time using one of various predefined easing functions, or you can use your own. Easing functions are typically used in animation to convey gradual acceleration and deceleration of objects. By default, timing will use a easeInOut curve that conveys gradual acceleration to full speed and concludes by gradually decelerating to a stop. You can specify a different easing function by passing a easing parameter. Custom duration or even a delay before the animation starts is also supported.';

export const setTickerText = (text) => ({
  type: types.SET_TICKER_TEXT,
  payload: text,
});

export const setLoading = (value) => ({
  type: types.SET_LOADING,
  payload: value,
});

export const setVideoURL = (url) => ({
  type: types.SET_VIDEO_URL,
  payload: url,
});

export const setHousesPosition = (housesPosition) => ({
  type: types.SET_HOUSES_POSITION,
  payload: housesPosition,
});

export const fetchTickerText = (callback) => dispatch => {
  Service.fetchTickerText((text) => {
    dispatch(setTickerText(text));
    setTimeout(() => {
      callback();
    }, 3000);
  });
};


export const fetchVideoURL = (schoolID) => dispatch => {
  Service.fetchVideoURL(schoolID, (result) => {
    if (result === 'failed') {
      Service.showToast('No video available');
    } else {
      dispatch(setVideoURL(result));
    }
  });
};

export const fetchHousesPosition = (schoolID) => dispatch => {
  Service.fetchHousesPosition(schoolID, (result) => {
    console.log('Houses position results');
    if (result === 'failed') {
      return;
    } else {
      dispatch(setHousesPosition(result));
      return;
    }
  });
};