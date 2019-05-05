import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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

// Configure FirebaseUI.
export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

export {firebase, database };