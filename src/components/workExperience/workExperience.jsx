import React, {Component} from 'react';
import './workExperience.css';
import Job from './job'

class WorkExperience extends Component {
    
    constructor(props) {
        super(props);
        let work_exp = this.props.work_exp;

        console.log(this.props)
        this.state = {
            jobs: work_exp
        }
    }
    
    render() {
        return(
            <div className="work-experience-container resume-builder-section">
                <h1 className="resume-builder-section-title">Work Experience</h1>
                
                {
                    this.state.jobs.map((job)=>{
                        return <Job key={job.id}/>
                    })
                }
            </div>
        )
    }

}

export default WorkExperience