import React, {Component} from 'react';
import './resumeBuilder.css';
// COMPONENTS
import UserInfo from '../userInfo/userInfo';
import WorkExperience from '../workExperience/workExperience';
import Education from '../education/education';
// Firebase
import firebase from 'firebase/app';

class ResumeBuilder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user_info: [],
            work_exp: [],
            education: [],
            showResumeTemplates: false
        }

        this.update = this.update.bind(this)
        this.toggleResumeTemplates = this.toggleResumeTemplates.bind(this)
    }

    componentWillMount() {
        let db = {};
        let self = this;

        firebase.database().ref('users/nahom/').once("value").then(snap=>{
            db = snap.val()
            // console.log("value snap: ", db)
        }).then(()=>{
            self.setState({
                loading: false,
                user_info: db.user_info,
                work_exp: db.work_exp,
                education: db.education
            })
        })

    }

    update() {
        let db;
        let self = this;

        firebase.database().ref('users/nahom/').once("value").then(snap=>{
            db = snap.val()
            // console.log("value snap: ", db)
        }).then(()=>{
            this.setState({
                user_info: db.user_info,
                work_exp: db.work_exp,
                education: db.education
            })
        })
    }

    toggleResumeTemplates(){
        this.setState({
            showResumeTemplates: !this.state.showResumeTemplates
        })
    }

    render() {
        
        return(
            this.state.loading === true
             ? 
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
             : 
                <div className="resume-builder-container">
                    <h1 className="resume-builder-title">bravoresume</h1>
                    <UserInfo update={this.update} user_info={this.state.user_info}/>
                    <WorkExperience update={this.update} work_exp={this.state.work_exp}/>
                    <Education update={this.update} education={this.state.education}/>
                    
                    {
                        this.state.showResumeTemplates === true
                            ?
                                <div className="resume-builder-section template-section">
                                    <div style={{paddingTop: "10px", paddingLeft: "25px", paddingBottom: "15px", position: "absolute"}}><span style={{color: "tomato", cursor: "pointer"}} onClick={this.toggleResumeTemplates}>X</span></div>
                                    <div className="template-section-container">
                                        <img className="resume-template-img" src="http://bravoresume.com/static/media/beautiful_resume.e96c3ee8.JPG" alt="beautiful resume"/>
                                        <img className="resume-template-img" src="http://bravoresume.com/static/media/structured_resume.f756cce5.JPG" alt=""/>
                                        <img className="resume-template-img" src="http://bravoresume.com/static/media/fancy_resume.fd52a836.JPG" alt=""/>
                                        <img className="resume-template-img" src="http://bravoresume.com/static/media/leftbar_resume.a21cef82.JPG" alt=""/>
                                        <img className="resume-template-img" src="http://bravoresume.com/static/media/clean_resume.78baf65b.JPG" alt=""/>
                                    </div>
                                </div>
                            
                            : <div className="download-button-container"><button onClick={this.toggleResumeTemplates} className="download-button">Download</button></div>

                    }
                </div>
            
        )
    }

}

export default ResumeBuilder

/*
    Database Structure

    users:{
        user:{
            user_info:{
                name:
                last-name:
                email:
                phone:
                location
            },
            work_exp:[
                job1:{
                    company:
                    title:
                    location:
                    date:
                    bullet_points: [
                        "", "",""
                    ]
                }
                job2: {...}
                job3: {...}
            ],
            education: [
                degree1:{
                    degree: 
                    school:
                    date:
                }
                degree2: {...}
                degree3: {...}
                degree4: {...}
            ]
        }
    }
*/

/*
    Database Functions

    main:
        createUser()

    
    user_info: 
        update() functions to change the info

    work_exp: 
        update() functions
        addJob() to add new job experiences
        remJob() will delete the selected job 
        addBullet() to add new descriptions
        remBullet() to delete selected description

    education:
        update() function
        addDegree() to add new education field
        remDegree() to remove education field
*/