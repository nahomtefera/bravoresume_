import React, { Component } from 'react';
import './App.css';
// COMPONENTS
import ResumeBuilder from './components/resumeBuilder/resumeBuilder'
// Firebase 
import firebase from 'firebase/app';
import './components/firebase/';
// import { database } from './components/firebase/';
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

  }
  componentWillMount(){
    
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
