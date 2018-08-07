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
// react-router
import { BrowserRouter, Redirect, Route } from 'react-router-dom';


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
            firebase.database().ref(`users/${data.user.uid}`).set({
              id: data.user.uid,
              name: data.user.displayName,
              email:data.user.email,
            });
            firebase.database().ref().child(`users/${data.user.uid}/user_info`)
            .update({
                id: Date.now(),
                email: "", 
                last_name: "",
                location: "",
                name: "",
                phone: ""
            });
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
      <BrowserRouter>
        <div className="App">
          {/* Main Page that users and guests will see without signing-in */}
          <Route  
            exact path="/"
            render={() => 
              <div>
                {/* <Navbar isLandingPage={true} authUser={this.state.authUser}/> */}
                <h1 className="resume-builder-title">bravoresume</h1>
              </div>
              
            }
          />
          {/* Sign-in page */}
          <Route
            exact path="/sign-in"
            render={(props) => {
              // If user has already signed-in
              // Going to /sign-in page will redirect to landing page
              if (this.state.authUser !== null) {
                return <Redirect to='/resume-builder' />
              }
              return (
                // Only show sign-in if user is not authenticized
                this.state.authUser ? ""
                : 
                <div> 
                  {/* <Navbar authUser={this.state.authUser}/> */}
                  <StyledFriebaseAuth {...props} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                </div>
              )
            }
              
          }/>
          {/* Resume-Builder */}
          <Route  
            exact path="/resume-builder"
            render={() =>{
              // Going to /home page will redirect to landing page
              if (this.state.authUser === null) {
                return <Redirect to='/' />
              }
              return(
                <div>
                  {/* <Navbar isLandingPage={true} authUser={this.state.authUser}/> */}
                  <ResumeBuilder userId={this.state.authUser.uid} />
                </div>
              )}
            }
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
