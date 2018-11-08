import createReducer from './createReducer';
import * as types from '../types';

export const clientID = createReducer('', {
  [types.SET_CLIENT_ID](state, action) {
    return action.payload;
  },
});
