import React, {Component} from 'react';
import './education.css';

class Degree extends Component {

    render() {
        return(
            <div className="resume-builder-section-inner-container">
                {/* Degree*/}
                <div className="education-degree section-input-container">
                    <label className="section-input-label" htmlFor="education-degree">Degree</label>
                    <input className="section-input" placeholder="Computer Science" type="name"/>
                </div>
                {/* Last Name */}
                <div className="education-school section-input-container">
                    <label className="section-input-label" htmlFor="user-last-name">School</label>
                    <input className="section-input" placeholder="Stanford" type="education-school"/>
                </div>
                {/* Date */}
                <div className="education-date section-input-container">
                    <label className="section-input-label" htmlFor="education-date">Date</label>
                    <input className="section-input" placeholder="Year" type="text"/>
                </div>
                
            </div>
        )
    }

}

export default Degree