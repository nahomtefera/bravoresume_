import React, { Component } from 'react';
// COMPONENTS
import LandingPage from './components/landingPage/landingPage';
import ResumeBuilder from './components/resumeBuilder/resumeBuilder';
import JobApplications from './components/jobApplications/jobApplications';
// Firebase 
import firebase from 'firebase/app';
import './components/firebase/';
import { database } from './components/firebase/';
// Firebase auth ui
import StyledFriebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// react-router
import { BrowserRouter, Redirect, Route, Link } from 'react-router-dom';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)

    this.state= {
      // Loader
      loading: false,
      // SignedUser
      authUser: null,
      userInfo: null,
      toggleSignIn: false
    }

    // Config for firebaseAuthUi - Authentification
    this.uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
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
      signInFlow: "popup"
    }
    this.toggleSignIn = this.toggleSignIn.bind(this)
  }
  
  componentWillMount(){
    // Loader
    // var self = this;
    // setTimeout(function(){ 
    //   self.setState({loading:false}, ()=>{console.log(self.state)})
    // }, 1500);
  }

  componentDidMount() {
    console.log(this.state)
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
  
  toggleSignIn(){
    console.log('you clicked me')
    if(this.state.toggleSignIn == true) {
      this.setState({
        toggleSignIn: false
      })
      return
    }
    this.setState({
      toggleSignIn: true,
    })
  }

  render() { 
    return (
      this.state.loading === true
      ? 
        <div> 
          <h1 className="resume-builder-title">bravoresume</h1>
          <div className="loader-container">
              <div className="loader">Loading...</div>
          </div>
        </div>
        
      :
        <BrowserRouter>
          <div className="App">
            {
              this.state.authUser !== null 
                ?
                  <span className="sign-out-button">
                    <button type="button" onClick={()=>{firebase.auth().signOut()}} >
                        Sign-Out
                    </button>
                  </span>
                : null
            }
            {/* Main Page that users and guests will see without signing-in */}
            <Route  
              exact path="/"
              render={() => 
                <div>
                  {/* <Navbar isLandingPage={true} authUser={this.state.authUser}/> */}
                  <h1 style={{color: "#fff"}} className="resume-builder-title">bravoresume</h1>
                  <div className="sign-in-container"> 
                    {/* <Navbar authUser={this.state.authUser}/> */}
                    {
                      this.state.authUser !== null
                        ? <LandingPage userIsLogged={true}/>
                        : <div>
                           <LandingPage userIsLogged={false} toggleSignIn={this.toggleSignIn} userIsLogged={false}/>
                           {
                              this.state.toggleSignIn === true
                                ? 
                                  <div>
                                    <div onClick={this.toggleSignIn} className="firebase_ui-outer-container"></div>
                                    <StyledFriebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                                  </div>
                                : null
                           }
                        </div>
                    }
                    
                  </div>
                </div>
                
              }
            />
            {/* Resume-Builder */}
            <Route  
              exact path="/resume-builder"
              render={() =>{
                // Going to /home page will redirect to landing page
                if (this.state.authUser === null) {
                  console.log(this.state)
                  return <Redirect to='/' />
                }
                return(
                  <div>
                    <ResumeBuilder userId={this.state.authUser.uid} />
                  </div>
                )}
              }
            />
            {/* Job-Applications */}
            <Route  
              exact path="/job-applications"
              render={() =>{
                // Going to /home page will redirect to landing page
                if (this.state.authUser == null) {
                  console.log(this.state)
                  return <Redirect to='/' />
                }
                return(
                    <JobApplications userId={this.state.authUser.uid} />
                )}
              }
            />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
