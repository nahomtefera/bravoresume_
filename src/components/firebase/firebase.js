import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

// Firebase dev config
const config = {
    apiKey: "AIzaSyCvjHARFYpefm_TIVTco_iPO4RRr_ONhsk",
    authDomain: "bravoresume-80917.firebaseapp.com",
    databaseURL: "https://bravoresume-80917.firebaseio.com",
    projectId: "bravoresume-80917",
    storageBucket: "",
    messagingSenderId: "563995630309"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

// Firebase database call
const database = firebase.database();


export {
    database,
};