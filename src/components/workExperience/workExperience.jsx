import React, {Component} from 'react';
import './workExperience.css';
import Job from './job'
// Firebase
import firebase from 'firebase/app';

class WorkExperience extends Component {
    
    constructor(props) {
        super(props);
        let work_exp = this.props.work_exp;

        this.state = {
            jobs: work_exp || [],
            showJob: null
        }

        this.addJob = this.addJob.bind(this);
        this.remJob = this.remJob.bind(this);
        this.toggleJob = this.toggleJob.bind(this);
    }
    
    componentWillMount(){
        let jobs = this.state.jobs;
        let newJobs = []
        // loop through jobs and push them to array
        for(var id in jobs) {
            newJobs.push(jobs[id])
        }

        if(newJobs.length > 0) {
            this.setState({
                jobs: newJobs,
                showJob: newJobs[0].id
            })
        }else{
            this.setState({
                jobs: newJobs,
            })
        }

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
            jobs: prevJobs,
            showJob: timestamp
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
        
        if(newJobs.length > 0) {
            this.setState({
                jobs: newJobs,
                showJob: newJobs[newJobs.length -1].id
            })
        } else {
            this.setState({
                jobs: newJobs,
                showJob: null
            })
        }
 
    }

    toggleJob(el) {
        let id = el.target.id;
        this.setState({showJob: id})
    }

    render() {
        return(
            <div>
                <div className="work-experience-container resume-builder-section">
                    <h1 className="resume-builder-section-title"> <object type="image/svg+xml" className="resume-builder-section-title-icon" data={require('../images/travel-case.svg')}></object> Work Experience</h1>
                    <div className="bullet-nav-container">
                        {this.state.jobs.length > 0 
                            ? this.state.jobs.map((job)=>{
                                return <span onClick={this.toggleJob} className={this.state.showJob == job.id ? "bullet-nav-item-selected" : "bullet-nav-item"} key={`job-${job.id}`} id={job.id}>•</span>
                            })
                            : ""
                        } 
                    </div>
                    {
                        this.state.jobs.length > 0 
                            ? this.state.jobs.map((job)=>{
                                return <div className={this.state.showJob == job.id ? "job-outer-container" : "hide"} key={job.id} id={job.id}>
                                    <button className="rem-button" onClick={this.remJob}>Remove Job</button>
                                    <Job userId={this.props.userId} update={this.props.update} job_info={job}/>
                                </div>
                            })
                            : <button className="add-info" onClick={this.addJob}>Add new Job</button>  
                    }
                </div>

                {
                    this.state.jobs.length > 0 
                        ? <button className="add-info" onClick={this.addJob}>Add new Job</button>
                        : ""
                }
            </div>

        )
    }

}

export default WorkExperience