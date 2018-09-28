import React, {Component} from 'react';
import './coverLetter.css'

export default class CoverLetter extends Component {

    render() {
       return (
        <div className="cover-letter-container">
    
            <div className="cover-letter-construction">
                <h2 className="construction-title">Feature is under construction, be patient</h2>
                <img className="construction-image" src={require('../images/construction.png')} alt=""/>
            </div>
    
        </div>
       )
    }
}