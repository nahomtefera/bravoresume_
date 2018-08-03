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
            education: []
        }

        this.update = this.update.bind(this)
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
                    <div className="download-button-container"><button className="download-button">Download</button></div>
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