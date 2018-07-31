import React, { Component } from 'react';
import './App.css';
// COMPONENTS
import ResumeBuilder from './components/resumeBuilder/resumeBuilder'
// Firebase 
import firebase from 'firebase/app';
import './components/firebase/';
// import { database } from './components/firebase/';


class App extends Component {

  componentWillMount(){


        // firebase.database().ref('users/nahom').update({
        //   "user_info": {
        //     name: "Nahom",
        //     last_name: "Endale",
        //     email: " ",
        //     phone: " ",
        //     location: " "
        //   },
        //   "work_exp":[
        //     {
        //         id: Date.now(),
        //         company: " ", 
        //         title: " ",
        //         location: " ",
        //         date: " ",
        //         bullet_points: [" ", " "]
        //     }
        //   ],
        //   "education": [
        //       {
        //           id: Date.now(),
        //           degree: "",
        //           school: "",
        //           date: "",
        //       }
        //   ]
        // });   

    
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
