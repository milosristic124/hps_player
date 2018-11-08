import { takeLatest } from 'redux-saga/effects';
import * as types from '../types';
import * as home_saga from './home';

function* mySaga() {
  /*
    Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
    Allows concurrent fetches of user.
  */

  // Splash Sagas
  yield takeLatest(types.FETCH_TICKER_TEXT, home_saga.fetchTickerText);
  /*
      Alternatively you may use takeLatest.
      Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
      dispatched while a fetch is already pending, that pending fetch is cancelled
      and only the latest one will be run.
    */
}

export default mySaga;
