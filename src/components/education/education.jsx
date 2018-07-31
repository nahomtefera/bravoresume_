import React, {Component} from 'react';
import './education.css';
import Degree from './degree';

class Education extends Component {

    constructor(props) {
        super(props);
        let degrees = this.props.education;

        this.state = {
            degrees: degrees
        }
    }

    render() {
        return(
            <div className="education-container resume-builder-section">
                <h1 className="resume-builder-section-title">Education</h1>
                
                <div className="resume-builder-section-inner-container">
                   {
                       this.state.degrees.map((degree)=>{
                           return <Degree key={degree.id} />
                       })
                   }
                </div>
            </div>
        )
    }

}

export default Education