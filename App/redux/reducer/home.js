import createReducer from './createReducer';
import * as types from '../types';

export const tickerText = createReducer('', {
  [types.SET_TICKER_TEXT](state, action) {
    return action.payload;
  },
});

export const isLoading = createReducer(false, {
  [types.SET_LOADING](state, action) {
    return action.payload;
  },
});

export const videoURL = createReducer('', {
  [types.SET_VIDEO_URL](state, action) {
    return action.payload;
  }
});

export const housesPosition = createReducer('', {
  [types.SET_HOUSES_POSITION](state, action) {
    return action.payload;
  }
})
