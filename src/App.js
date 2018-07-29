import React, { Component } from 'react';
import './App.css';
// COMPONENTS
import ResumeBuilder from './components/resumeBuilder/resumeBuilder'

class App extends Component {
  render() {
    return (
      <div className="App">

        <ResumeBuilder />
      </div>
    );
  }
}

export default App;
