import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

// Firebase dev config
const prodConfig = {
    apiKey: "AIzaSyCvjHARFYpefm_TIVTco_iPO4RRr_ONhsk",
    authDomain: "bravoresume-80917.firebaseapp.com",
    databaseURL: "https://bravoresume-80917.firebaseio.com",
    projectId: "bravoresume-80917",
    storageBucket: "",
    messagingSenderId: "563995630309"
};

const devConfig = {
    apiKey: "AIzaSyBaAjBdeQWR9HvPPOlw4Qk55w0-IuhZH3g",
    authDomain: "bravoresume-dev.firebaseapp.com",
    databaseURL: "https://bravoresume-dev.firebaseio.com",
    projectId: "bravoresume-dev",
    storageBucket: "bravoresume-dev.appspot.com",
    messagingSenderId: "38481123968"
  };

// Use different key depending on evironment (prod or dev)
const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

// Firebase database call
const database = firebase.database();


export {
    database,
};