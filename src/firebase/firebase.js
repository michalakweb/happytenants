import firebase from 'firebase/app';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyAXq8JEGWNUGEd4ToVNuMgwNj4i6VhMBDI",
  authDomain: "happy-tenants.firebaseapp.com",
  databaseURL: "https://happy-tenants.firebaseio.com",
  projectId: "happy-tenants",
  storageBucket: "happy-tenants.appspot.com",
  messagingSenderId: "1044021883702"
};
  
firebase.initializeApp(config);
  
const database = firebase.database();

export {firebase, database};