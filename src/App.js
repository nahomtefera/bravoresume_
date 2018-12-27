import React, { Component } from 'react';
// COMPONENTS
import LandingPage from './components/landingPage/landingPage';
import ResumeBuilder from './components/resumeBuilder/resumeBuilder';
import CoverLetter from './components/coverLetter/coverLetter';
import JobApplications from './components/jobApplications/jobApplications';
import PrivacyPolicy from './components/privacyPolicy/privacyPolicy';
// Firebase 
import firebase from 'firebase/app';
import './components/firebase/';
// Firebase auth ui
import StyledFriebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// react-router
import {HashRouter, Redirect, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import createHistory from 'history/createBrowserHistory'
// Styles
import './App.css';

// Google Analytics
import ReactGA from 'react-ga';
process.env.NODE_ENV === 'production'
  ? ReactGA.initialize('UA-77359878-3') // Will be used on live page
  : ReactGA.initialize('UA-124915007-1') // Will be used on dev page
  
const history = createHistory()
// history.listen((location, action) => {
//   console.log("location: ", location)
//   ReactGA.set({ page: location.pathname });
//   ReactGA.pageview(location.pathname);
// });


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
      signInFlow: "popup"
    }
    this.toggleSignIn = this.toggleSignIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  componentWillMount() {
    console.log(history)
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

  signOut(){
    firebase.auth().signOut();
    this.setState({toggleSignIn: false})
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
        <HashRouter>
          {/* Sing-out button */}
          <div className="App">
            {
              this.state.authUser !== null 
                ?
                  <span className="sign-out-button">
                    <button type="button" onClick={()=>{this.signOut()}} >
                        Sign-Out
                    </button>
                  </span>
                : null
            }
            {/* Landing Page that users and guests will see without signing-in */}
            <Route  
              exact path="/"
              render={() => 
                <div>
                  {/* <Navbar isLandingPage={true} authUser={this.state.authUser}/> */}
                  <h1 style={{color: "#607d8b"}} className="resume-builder-title">bravoresume</h1>
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
                  return <Redirect to='/' />
                }
                return(
                  <div>
                    {/* Nav */}
                    <Link to="/"><h1 className="resume-builder-title">bravoresume</h1></Link>
                    <div className="nav-container">
                        <Link to="/resume-builder">
                            <h3 className="nav-link nav-link-active">Resume Builder</h3>
                        </Link>
                        {/* <Link to="/cover-letter">
                            <h3 className="nav-link">Cover Letter</h3>
                        </Link> */}
                        <Link to="/job-applications">
                            <h3 className="nav-link">Job Tracker</h3>
                        </Link>
                    </div>

                    {/* Resume Builder Component */}
                    <ResumeBuilder userId={this.state.authUser.uid} />
                  </div>
                )}
              }
            />
            {/* Cover-Letter */}
            <Route  
              exact path="/cover-letter"
              render={() =>{
                // Going to /home page will redirect to landing page
                if (this.state.authUser === null) {
                  return <Redirect to='/' />
                }
                return(
                  <div>
                    {/* Nav */}
                    <Link to="/"><h1 className="resume-builder-title">bravoresume</h1></Link>
                    <div className="nav-container">
                        <Link to="/resume-builder">
                            <h3 className="nav-link">Resume Builder</h3>
                        </Link>
                        {/* <Link to="/cover-letter">
                            <h3 className="nav-link nav-link-active">Cover Letter</h3>
                        </Link> */}
                        <Link to="/job-applications">
                            <h3 className="nav-link">Job Tracker</h3>
                        </Link>
                    </div>

                    {/* Resume Builder Component */}
                    <CoverLetter userId={this.state.authUser.uid} />
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
                  return <Redirect to='/' />
                }
                return(
                  <div>
                    {/* Nav */}
                    <Link to="/"><h1 className="resume-builder-title">bravoresume</h1></Link>
                    <div className="nav-container">
                      <Link to="/resume-builder">
                        <h3 className="nav-link">Resume Builder</h3>
                      </Link>
                      {/* <Link to="/cover-letter">
                            <h3 className="nav-link">Cover Letter</h3>
                      </Link> */}
                      <Link to="/job-applications">
                        <h3 className="nav-link nav-link-active">Job Tracker</h3>
                      </Link>
                    </div>

                    {/* Job Tracker Component */}
                    <JobApplications userId={this.state.authUser.uid} />
                  </div>
                )}
              }
            />
          
            {/* Job-Applications */}
            <Route  
              exact path="/privacy-policy"
              render={() =>{
                return(
                  <div>
                    {/* Nav */}
                    <Link to="/"><h1 className="resume-builder-title">bravoresume</h1></Link>
                    {/* Privacy Policy */}
                    <PrivacyPolicy />
                  </div>
                )}
              }
            />
          
          </div>
        </HashRouter>
    );
  }
}

export default App;
