import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBD67TU74DKZdG7PNm89O5xLtIVbdrCK10",
  authDomain: "bereans-readings.firebaseapp.com",
  databaseURL: "https://bereans-readings.firebaseio.com",
  projectId: "bereans-readings",
  storageBucket: "",
  messagingSenderId: "768518202170"
};
firebase.initializeApp(config);

const fdb = firebase.database();

export default fdb;
