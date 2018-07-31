import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

// Firebase dev config
const config = {
    apiKey: "AIzaSyDIH_j22ZUecvp9M2JuvkbqXtPfS_cYWp8",
    authDomain: "auth-router-boilerplate.firebaseapp.com",
    databaseURL: "https://auth-router-boilerplate.firebaseio.com",
    projectId: "auth-router-boilerplate",
    storageBucket: "",
    messagingSenderId: "783069520328"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

// Firebase database call
const db = firebase.database();


export {
    db,
};