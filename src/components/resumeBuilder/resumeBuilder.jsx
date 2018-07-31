import React, {Component} from 'react';
import './resumeBuilder.css';
// COMPONENTS
import UserInfo from '../userInfo/userInfo';
import WorkExperience from '../workExperience/workExperience';
import Education from '../education/education';

class ResumeBuilder extends Component {

    render() {
        return(
            <div className="resume-builder-container">
                <h1 className="resume-builder-title">Resume Builder</h1>
                <UserInfo />
                <WorkExperience />
                <Education />
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