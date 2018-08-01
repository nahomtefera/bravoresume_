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

        this.addJob = this.addJob.bind(this)
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
            company: " ", 
            title: " ",
            location: " ",
            date: " ",
            bullet_points: [" "]
        })

        firebase.database().ref().child('/users/nahom/work_exp/' + timestamp)
        .update({
            id: timestamp,
            company: " ", 
            title: " ",
            location: " ",
            date: " ",
            bullet_points: [" "]
        });

        this.props.update()
        this.setState({
            jobs: prevJobs
        })
    }
    
    render() {
        return(
            <div className="work-experience-container resume-builder-section">
                <h1 className="resume-builder-section-title">Work Experience</h1>
                
                {
                    this.state.jobs.length > 0 
                        ? this.state.jobs.map((job)=>{
                            return <Job update={this.props.update} job_info={job} key={job.id}/>
                          })
                        : "No Jobs"  
                }

                <button onClick={this.addJob}>Add Job</button>
            </div>
        )
    }

}

export default WorkExperience