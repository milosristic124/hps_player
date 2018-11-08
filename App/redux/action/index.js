import * as routeActions from './route';
import * as loginActions from './login';
import * as homeActions from './home';

export const ActionCreators = Object.assign(
  {},
  loginActions,
  homeActions,
  routeActions,
);
