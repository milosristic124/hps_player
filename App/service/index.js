import Toast from 'react-native-simple-toast';
import firebase from './firebase';
// import * as types from '../redux/types';


export const loginFirebase = (schoolID, callback) => {
  const ref = firebase.database().ref('/settings');
  ref.once('value', (snapshot) => {
    const data = snapshot.val();
    let keys = Object.keys(data);
    console.log('keys-->', keys);
    var count = 0;
    keys.map(key => {
      if(key == schoolID) {
        callback(schoolID);
        count ++;
      } else if(count == 0 && key != schoolID) {
        callback('failed');
      }
    });
  });
};

export const fetchVideoURL = (schoolID, callback) => {
  const ref = firebase.database().ref(`/settings/${schoolID}/url`);
  ref.once('value', (snapshot) => {
    const data = snapshot.val();
    console.log('URL-->', data);
    if( data ) {
      callback(data);
    } else {
      callback('failed');
    }
  })
}

export const fetchHousesPosition = (schoolID, callback) => {
  const ref = firebase.database().ref(`/houses/${schoolID}`);
  ref.once('value', (snapshot) => {
    const data = snapshot.val();
    if( data ) {
      callback(data);
    } else {
      callback('failed');
    }
  })
}

export const fetchTickerText = (callback) => {
  const ref = firebase.database().ref('/announcements/1002');
  ref.once('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
      let text = '';
      Object.keys(data).map((key) => text = `${text}   ${data[key]}`);
      callback(text);
    }
  });
};

export const showToast = (msg) => {
  setTimeout(() => {
    Toast.show(msg, Toast.LONG);
  }, 500);
};
