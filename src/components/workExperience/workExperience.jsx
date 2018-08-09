import React, {Component} from 'react';
import './workExperience.css';
import Job from './job'
// Firebase
import firebase from 'firebase/app';

class WorkExperience extends Component {
    
    constructor(props) {
        super(props);
        let work_exp = this.props.work_exp;

        console.log(this.props)
        this.state = {
            jobs: work_exp || []
        }

        this.addJob = this.addJob.bind(this);
        this.remJob = this.remJob.bind(this);
    }
    
    componentWillMount(){
        let jobs = this.state.jobs;
        let newJobs = []
        // loop through jobs and push them to array
        for(var id in jobs) {
            newJobs.push(jobs[id])
        }

        this.setState({
            jobs: newJobs
        })
    }

    addJob(){
        let timestamp = Date.now()
        let prevJobs = this.state.jobs;

        prevJobs.push({
            id: timestamp,
            company: "", 
            title: "",
            location: "",
            date: "",
            bullet_points: []
        })

        firebase.database().ref().child(`users/${this.props.userId}/work_exp/` + timestamp)
        .update({
            id: timestamp,
            company: "", 
            title: "",
            location: "",
            date: "",
            bullet_points: []
        });

        this.props.update()
        this.setState({
            jobs: prevJobs
        })
    }
    
    remJob(el) {
        let id = el.target.parentNode.id;
        let prevJobs = this.state.jobs;
        let newJobs = this.state.jobs;

        for(let i=0; i<this.state.jobs.length; i++) {

            if(prevJobs[i].id == id) {
                newJobs.splice(i, 1)
            } 

        }
        firebase.database().ref().child(`users/${this.props.userId}/work_exp/` + id).remove()
        this.props.update()
        
        this.setState({
            jobs: newJobs
        })
 
    }

    render() {
        return(
            <div className="work-experience-container resume-builder-section">
                <h1 className="resume-builder-section-title"> <object type="image/svg+xml" className="resume-builder-section-title-icon" data={require('../images/travel-case.svg')}></object> Work Experience</h1>
                
                {
                    this.state.jobs.length > 0 
                        ? this.state.jobs.map((job)=>{
                            return <div className="job-outer-container" key={job.id} id={job.id}>
                                <button className="rem-button" onClick={this.remJob}>Remove Job</button>
                                <Job userId={this.props.userId} update={this.props.update} job_info={job}/>
                            </div>
                          })
                        : <button className="add-info" onClick={this.addJob}>Add</button>  
                }
                {
                    this.state.jobs.length > 0 
                        ? <button className="add-info" onClick={this.addJob}>Add</button>
                        : ""
                }
                
            </div>
        )
    }

}

export default WorkExperience