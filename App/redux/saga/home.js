import { put } from 'redux-saga/effects';
// import NavigatorService from '../../service/navigator';

import * as types from '../types';
import * as Service from '../../service';


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchTickerText(action) {
  try {
    yield put({ type: types.SET_LOADING, payload: false });
    yield put({ type: types.SET_TICKER_TEXT, payload: action.payload });
  } catch (e) {
    Service.showToast(e.toString());
  }
}
