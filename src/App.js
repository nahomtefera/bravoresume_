import React, { Component } from 'react';
import './App.css';
// COMPONENTS
import ResumeBuilder from './components/resumeBuilder/resumeBuilder'
// Firebase 
import firebase from 'firebase/app';
import './components/firebase/';
import { database } from './components/firebase/';
// Firebase auth ui
import StyledFriebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class App extends Component {
  constructor(props) {
    super(props)

    this.state= {
      // Loader
      loading: "false",
      // SignedUser
      authUser: null,
      userInfo: null,
    }

    // Config for firebaseAuthUi - Authentification
    this.uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (data) => {
          // If the user signing-in is a new user
          // We will add them to the firebase database
          if(data.additionalUserInfo.isNewUser === true) {
            database.doCreateUser(data.user.uid, data.user.displayName, data.user.email)
          } 

        },
        signInFailure: function(error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
          alert(error)
        }
      },
      signInFlow: "redirect"
    }

  }

  componentDidMount() {
    // Everytime user signs-in or out
    // We will update the state
    // Set it to null if users signs-out
    // And set it to user if user signs-in
    firebase.auth().onAuthStateChanged(authUser => {
      authUser
        ? (
            firebase.database().ref(`users/${authUser.uid}`).once('value').then(snap=>{
              let userInfo = snap.val();
              this.setState(() => ({ authUser: authUser, userInfo: userInfo }))
            })
          
          )
        : this.setState(() => ({ authUser: null }));
    });
  }
  
  render() {
    return (
      <div className="App">

        <ResumeBuilder />
      </div>
    );
  }
}

export default App;
