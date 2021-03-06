import React, {Component} from 'react';
// Firebase
import firebase from 'firebase/app';

class Project extends Component {
    
    constructor(props) {
        super(props);
        let project_info = this.props.project_info;

        this.state = {
            id: project_info.id,
            company: project_info.company,
            title: project_info.title,
            location: project_info.location,
            date: project_info.date,
            bullet_points: project_info.bullet_points
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
        let id = el.target.parentNode.parentNode.id;
        let prevBulletPoints = this.state.bullet_points;
        let newBulletPoints = this.state.bullet_points;
        for(let i=0; i<this.state.bullet_points.length; i++) {

            if(prevBulletPoints[i].id == id) {
                newBulletPoints.splice(i, 1)
            } 

        }
        firebase.database().ref().child(`/users/${this.props.userId}/projects/` + this.state.id + "/bullet_points/" + id).remove()
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


        firebase.database().ref().child(`users/${this.props.userId}/projects/` + this.state.id + "/bullet_points/" + timestamp)
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

        firebase.database().ref(`users/${this.props.userId}/projects/${this.state.id}/bullet_points/${id}`).update(update)

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

        firebase.database().ref(`users/${this.props.userId}/projects/${this.state.id}`).update(update)

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
                    <input autoComplete="off" className="section-input" onChange={this.handleChange} id="company" value={this.state.company} placeholder="Company" type="location"/>
                </div>
                {/* Job Title */}
                <div className="work-experience-title section-input-container">
                    <label className="section-input-label" htmlFor="user-name">Title</label>
                    <input autoComplete="off" className="section-input" onChange={this.handleChange} id="title" value={this.state.title} placeholder="Title" type="name"/>
                </div>
                {/* Location */}
                <div className="work-experience-location section-input-container">
                    <label className="section-input-label" htmlFor="user-last-name">Location</label>
                    <input autoComplete="off" className="section-input" onChange={this.handleChange} id="location" value={this.state.location} placeholder="City" type="last-name"/>
                </div>
                {/* Dates */}
                <div className="work-experience-date section-input-container">
                    <label className="section-input-label" htmlFor="user-email">Date</label>
                    <input autoComplete="off" className="section-input" onChange={this.handleChange} id="date" value={this.state.date} placeholder="Jan 2016 - Jun 2018" type="email"/>
                </div>

                <ul className="work-experience-bullet-list">
                    {
                        this.state.bullet_points.length > 0
                            ? this.state.bullet_points.map((bullet_point)=>{
                                return <li id={bullet_point.id} key={bullet_point.id}>
                                            <textarea name=""className="section-input bullet-list-item" 
                                                onChange={this.changeBulletPoint}
                                                value={bullet_point.description}
                                                placeholder="Enhanced skills for future success and created own personal brand shared with 12 area employers..."  
                                                id="" cols="30" rows="3"></textarea>

                                            <div className="rem-button" onClick={this.deleteBullet} style={{verticalAlign: "top", color: "tomato"}}> <img style={{width: "15px"}} src={require('../images/close.svg')}/> </div>
                                    </li>
                                })
                            : <div style={{textAlign:'right'}}><button className="add-bullet-point"  onClick={this.addBullet}>Add Description</button></div>
                    }
                </ul>
                
                    {
                        this.state.bullet_points.length > 0
                            ? <div style={{textAlign:'right'}}><button className="add-bullet-point"  onClick={this.addBullet}>Add Description</button></div>
                            : ""
                    }
                
                
            </div>
        )
    }

}

export default Project