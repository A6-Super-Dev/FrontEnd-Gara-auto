import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAYELMe6mZGH9XD3Fs8jfUWi1E9IP_ZcIQ',
  authDomain: 'oto-a6-superdev.firebaseapp.com',
  projectId: 'oto-a6-superdev',
  storageBucket: 'oto-a6-superdev.appspot.com',
  messagingSenderId: '140730947564',
  appId: '1:140730947564:web:8a940c2dbc0dcae03212c9',
  measurementId: 'G-KZYE5V6G8E',
};
const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
