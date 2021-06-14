import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCA2jdx2mKknseiEN-w7cVXcfbebvnJIpQ',
  authDomain: 'newmapofproblems.firebaseapp.com',
  databaseURL: 'https://newmapofproblems.firebaseio.com',
  projectId: 'newmapofproblems',
  storageBucket: 'newmapofproblems.appspot.com',
  messagingSenderId: '581097997234',
  appId: '1:581097997234:web:bda9f3f77e38c3610a1aab',
  measurementId: 'G-TXBZW1RKRD'
});

export default firebaseApp;
