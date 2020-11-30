import firebase from 'firebase';
require('@firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9c6-QhjWk0oPfCAuVomD9CrHuIHr7OsE",
    authDomain: "storyhub-1e6fd.firebaseapp.com",
    databaseURL: "https://storyhub-1e6fd.firebaseio.com",
    projectId: "storyhub-1e6fd",
    storageBucket: "storyhub-1e6fd.appspot.com",
    messagingSenderId: "623203388900",
    appId: "1:623203388900:web:f65c3539459214052f8bf1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
