import React, {Component} from 'react';
import './workExperience.css';

class WorkExperience extends Component {

    render() {
        return(
            <div className="work-experience-container resume-builder-section">
                <h1 className="resume-builder-section-title">Work Experience</h1>
                
                <div className="resume-builder-section-inner-container job-container">
                    {/* Company */}
                    <div className="work-experience-company section-input-container">
                        <label className="section-input-label" htmlFor="user-address">Company</label>
                        <input className="section-input" placeholder="Company" type="location"/>
                    </div>
                    {/* Job Title */}
                    <div className="work-experience-title section-input-container">
                        <label className="section-input-label" htmlFor="user-name">Title</label>
                        <input className="section-input" placeholder="Title" type="name"/>
                    </div>
                    {/* Location */}
                    <div className="work-experience-location section-input-container">
                        <label className="section-input-label" htmlFor="user-last-name">Location</label>
                        <input className="section-input" placeholder="City" type="last-name"/>
                    </div>
                    {/* Dates */}
                    <div className="work-experience-date section-input-container">
                        <label className="section-input-label" htmlFor="user-email">Date</label>
                        <input className="section-input" placeholder="Jan 2016 - Jun 2018" type="email"/>
                    </div>

                    <ul className="work-experience-bullet-list">
                        <li>
                            <textarea name=""className="section-input bullet-list-item" 
                            placeholder="Brief description of a task you performed, be specific."  id="" cols="30" rows="2"></textarea>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }

}

export default WorkExperience