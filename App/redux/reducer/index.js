import { combineReducers } from 'redux';
import * as loginReducer from './login';
import * as routeReducer from './route';
import * as homeReducer from './home';

export default combineReducers(Object.assign(
  loginReducer,
  routeReducer,
  homeReducer,
));
