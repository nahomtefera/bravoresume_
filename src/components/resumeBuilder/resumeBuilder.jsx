import React, {Component} from 'react';
import './resumeBuilder.css';
// COMPONENTS
import UserInfo from '../userInfo/userInfo';
import WorkExperience from '../workExperience/workExperience';
import Education from '../education/education';

class ResumeBuilder extends Component {

    render() {
        return(
            <div className="resume-builder-container">
                ResumeBuilder
                <UserInfo />
                <WorkExperience />
                <Education />
            </div>
        )
    }

}

export default ResumeBuilder