import * as types from '../types';

export const setRouteName = routeName => ({
  type: types.ROUTE_NAME,
  payload: routeName,
});
