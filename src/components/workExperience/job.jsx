import React, {Component} from 'react';
import './workExperience.css';
// Firebase
import firebase from 'firebase/app';

class Job extends Component {
    
    constructor(props) {
        super(props);
        let job_info = this.props.job_info;

        this.state = {
            id: job_info.id,
            company: job_info.company,
            title: job_info.title,
            location: job_info.location,
            date: job_info.date,
            bullet_points: job_info.bullet_points
        }
        this.handleChange = this.handleChange.bind(this);
        this.addBullet = this.addBullet.bind(this);
        this.changeBulletPoint = this.changeBulletPoint.bind(this);
        this.deleteBullet = this.deleteBullet.bind(this)
    }

    componentWillMount() {
        let bullet_points = this.state.bullet_points;
        let newBullet_points = []
        // loop through jobs and push them to array
        for(var id in bullet_points) {
            newBullet_points.push(bullet_points[id])
        }

        this.setState({
            bullet_points: newBullet_points
        })
    }

    deleteBullet(el) {
        let id = el.target.parentNode.id;
        let prevBulletPoints = this.state.bullet_points;
        let newBulletPoints = this.state.bullet_points;

        for(let i=0; i<this.state.bullet_points.length; i++) {

            if(prevBulletPoints[i].id == id) {
                console.log("match", id, newBulletPoints[i])
                newBulletPoints.splice(i, 1)
                console.log(newBulletPoints)
            } 

        }
        firebase.database().ref().child('/users/nahom/work_exp/' + this.state.id + "/bullet_points/" + id).remove()
        this.props.update()
        
        this.setState({
            bullet_points: newBulletPoints
        })
 
    }

    addBullet(){
        let prevDescription = this.state.bullet_points;
        let timestamp = Date.now()

        let newJob = {
            id: timestamp,
            description: ""
        }

        prevDescription.push(newJob);


        firebase.database().ref().child('/users/nahom/work_exp/' + this.state.id + "/bullet_points/" + timestamp)
        .update(newJob);

        this.props.update()
        this.setState({
            bullet_points: prevDescription
        })
    }

    changeBulletPoint(el){
        let id = el.target.parentNode.id;
        let prevBulletPoints = this.state.bullet_points;
        let value = el.target.value;

        for(var key in prevBulletPoints) {
            if(id == prevBulletPoints[key].id) {
                prevBulletPoints[key].description = value;
            }
        }

        let update = {}
        update['description'] = value;

        firebase.database().ref(`users/nahom/work_exp/${this.state.id}/bullet_points/${id}`).update(update)

        this.props.update()

        this.setState({
            bullet_points: prevBulletPoints
        })
    }

    handleChange(el){
        let val = el.target.value;
        let id = el.target.id;
        let update = {}
        update[id] = val;

        firebase.database().ref(`users/nahom/work_exp/${this.state.id}`).update(update)

        this.props.update()
        this.setState({
            [id]: val
        })

    }

    render() {
        return(                
            <div className="resume-builder-section-inner-container job-container">
                {/* Company */}
                <div className="work-experience-company section-input-container">
                    <label className="section-input-label" htmlFor="user-address">Company</label>
                    <input className="section-input" onChange={this.handleChange} id="company" value={this.state.company} placeholder="Company" type="location"/>
                </div>
                {/* Job Title */}
                <div className="work-experience-title section-input-container">
                    <label className="section-input-label" htmlFor="user-name">Title</label>
                    <input className="section-input" onChange={this.handleChange} id="title" value={this.state.title} placeholder="Title" type="name"/>
                </div>
                {/* Location */}
                <div className="work-experience-location section-input-container">
                    <label className="section-input-label" htmlFor="user-last-name">Location</label>
                    <input className="section-input" onChange={this.handleChange} id="location" value={this.state.location} placeholder="City" type="last-name"/>
                </div>
                {/* Dates */}
                <div className="work-experience-date section-input-container">
                    <label className="section-input-label" htmlFor="user-email">Date</label>
                    <input className="section-input" onChange={this.handleChange} id="date" value={this.state.date} placeholder="Jan 2016 - Jun 2018" type="email"/>
                </div>

                <ul className="work-experience-bullet-list">
                    {
                        this.state.bullet_points.length > 0
                            ? this.state.bullet_points.map((bullet_point)=>{
                                return <li id={bullet_point.id} key={bullet_point.id}>
                                            <button onClick={this.deleteBullet} style={{verticalAlign: "top"}}>Delete bullet</button>
                                            <textarea name=""className="section-input bullet-list-item" 
                                                onChange={this.changeBulletPoint}
                                                value={bullet_point.description}
                                                placeholder="Brief description of a task you performed, be specific."  
                                                id="" cols="30" rows="2"></textarea>
                                    </li>
                                })
                            : "Add a description"
                    }
                </ul>

                <div style={{textAlign: "right", paddingRight: "5em"}}><button onClick={this.addBullet}>Add Bullet</button></div>
                
            </div>
        )
    }

}

export default Job