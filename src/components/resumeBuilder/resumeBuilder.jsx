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
            user_info: [],
            work_exp: [],
            education: []
        }
    }

    componentWillMount() {
        let db = {};

        firebase.database().ref('users/nahom/user_info').on("child_added", (snap)=>{
            db["user_info"] = snap.val()
        })

        firebase.database().ref('users/nahom/work_exp').on("child_added", (snap)=>{
            db["work_exp"] = snap.val()
        })

        firebase.database().ref('users/nahom/education').on("child_added", (snap)=>{
            db["education"] = snap.val()
        })

        this.setState({
            user_info: db.user_info,
            work_exp: db.work_exp,
            education: db.education
        })
    }

    render() {
        return(
            <div className="resume-builder-container">
                <h1 className="resume-builder-title">Resume Builder</h1>
                <UserInfo user_info={this.state.user_info}/>
                <WorkExperience work_exp={this.state.work_exp}/>
                <Education education={this.state.education}/>
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