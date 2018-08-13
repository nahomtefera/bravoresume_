import React, {Component} from 'react';
import './resumeBuilder.css';
// COMPONENTS
import UserInfo from '../userInfo/userInfo';
import WorkExperience from '../workExperience/workExperience';
import Education from '../education/education';
import Projects from '../projects/projects';
// Firebase
import firebase from 'firebase/app';
// React-router
import {Link } from 'react-router-dom';
// Resume Templates
import beautiful_resume from '../resumes/beautiful_resume';
import structured_resume from '../resumes/structured_resume';
import madrid_resume from '../resumes/madrid_resume';
import tokyo_resume from '../resumes/tokyo_resume';


class ResumeBuilder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user_info: [],
            work_exp: [],
            education: [],
            projects:[],
            showResumeTemplates: false
        }

        this.update = this.update.bind(this);
        this.toggleResumeTemplates = this.toggleResumeTemplates.bind(this);
        this.previewResume = this.previewResume.bind(this);
    }

    previewResume(resumeTemplate){

        let currentWorkExp = this.state.work_exp;
        let work_exp = [];
        let education = [];
        for(var job in currentWorkExp) {
            // Object.values will convert the object into an array of objects
            currentWorkExp[job]['bullet_points'] = Object.values(currentWorkExp[job]['bullet_points']);

            console.log(currentWorkExp[job])
            work_exp.push(currentWorkExp[job])
        }
        for(var degree in this.state.education) {
            education.push(this.state.education[degree])
        }

        let resumeInfo = {
            "user_info": this.state.user_info, 
            "work_exp": work_exp,
            "education": education
        }
        console.log(resumeInfo)
        resumeTemplate(resumeInfo)
    }

    componentWillMount() {
        let db = {};
        let self = this;

        firebase.database().ref(`users/${this.props.userId}/`).once("value").then(snap=>{
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

        firebase.database().ref(`users/${this.props.userId}/`).once("value").then(snap=>{
            db = snap.val()
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
                    <Link to="/"><h1 className="resume-builder-title">bravoresume</h1></Link>
                    <UserInfo update={this.update} userId={this.props.userId} user_info={this.state.user_info}/>
                    <WorkExperience update={this.update} userId={this.props.userId} work_exp={this.state.work_exp}/>
                    <Education update={this.update} userId={this.props.userId} education={this.state.education}/>
                    <Projects update={this.update} userId={this.props.userId} projects={this.state.projects}/>

                    {
                        this.state.showResumeTemplates === true
                            ?
                                <div className="resume-builder-section template-section">
                                    <div style={{paddingTop: "10px", paddingLeft: "25px", paddingBottom: "15px", position: "absolute", right: "18px"}}><span style={{color: "tomato", cursor: "pointer"}} onClick={this.toggleResumeTemplates}>X</span></div>
                                    <div className="template-section-container">
                                        <img onClick={()=>{this.previewResume(beautiful_resume)}} className="resume-template-img" src="http://bravoresume.com/static/media/beautiful_resume.e96c3ee8.JPG" alt="beautiful resume"/>
                                        <img onClick={()=>{this.previewResume(structured_resume)}} className="resume-template-img" src="http://bravoresume.com/static/media/structured_resume.f756cce5.JPG" alt=""/>
                                        <img onClick={()=>{this.previewResume(madrid_resume)}} className="resume-template-img" src="http://bravoresume.com/static/media/fancy_resume.fd52a836.JPG" alt=""/>
                                        <img onClick={()=>{this.previewResume(tokyo_resume)}} className="resume-template-img" src="http://bravoresume.com/static/media/leftbar_resume.a21cef82.JPG" alt=""/>
                                        <img className="resume-template-img" src="http://bravoresume.com/static/media/clean_resume.78baf65b.JPG" alt=""/>
                                    </div>
                                </div>
                            
                            : <div className="download-button-container"><button onClick={this.toggleResumeTemplates} className="download-button">Download</button></div>

                    }

                    <embed id='pdfV'/>

                </div>
            
        )
    }

}

export default ResumeBuilder
