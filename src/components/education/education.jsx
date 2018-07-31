import React, {Component} from 'react';
import './education.css';

class Education extends Component {

    render() {
        return(
            <div className="education-container resume-builder-section">
                <h1 className="resume-builder-section-title">Education</h1>
                
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
            </div>
        )
    }

}

export default Education