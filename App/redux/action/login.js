import * as types from '../types';
import * as Service from '../../service';
import NavigatorService from '../../service/navigator';

const loginDetail = {
  email: 'ivan.cacevic317@gmail.com',
  password: 'ivan.test',
};

export const setClientID = (id) => ({
  type: types.SET_CLIENT_ID,
  payload: id,
});

export const setLoading = (value) => ({
  type: types.SET_LOADING,
  payload: value,
});

export const login = (schoolID) => dispatch => {
  dispatch(setClientID(schoolID));
  dispatch(setLoading(true));
  Service.loginFirebase(schoolID, (result) => {
    dispatch(setLoading(false));
    if (result === 'failed') {
      Service.showToast('Invalid School ID');
    } else {
      NavigatorService.navigate('home', { schoolID: result });
    }
  });
};
