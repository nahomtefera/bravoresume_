import React, {Component} from 'react';
import './landingPage.css'
import Footer from '../footer/footer'
// react-router
import {Link } from 'react-router-dom';

export default class LandingPage extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <div className="stripe">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon className="stripe-polygon" fill="#f00" points="0,0 100,0 100,65 0,100"></polygon>
                    </svg>
                </div>
                        <p className="intro-text-paragraph">
                            Bravoresume is a platform that gives you free unlimited access to a growing catalog of <span style={{fontWeight:"300"}}>elegant resume templates</span> and a <span style={{fontWeight:"300"}}>job tracker</span> to simplify your job-hunting experience.
                        </p>
                <div>
                    {
                        this.props.userIsLogged === true 
                            ? 
                                <div>
                                    <Link to="/resume-builder"> 
                                        <button className="intro-buttons">Resume Builder</button>
                                    </Link>
                                    <Link to="/job-applications"> 
                                        <button className="intro-buttons">Job Tracker</button>
                                    </Link>
                                </div>
                            : <button onClick={this.props.toggleSignIn} className="intro-buttons">Sign-up / Sign-in</button>
                    }
                </div>
                <div className="intro-resume-builder">

                    <div className="intro-resume-builder-text">
                        <h5>Create your resume</h5>
                        <p>Bravoresume's intuitive form makes it very easy for you to add, modify and remove your information. </p>
                    </div>

                    <div className="intro-resume-builder-img">
                        <img src={require('./images/wireframe4.svg')} className="wireframe-img" alt="wireframe"/>
                    </div>

                </div>
                <div className="intro-resume-builder">

                    <div className="intro-resume-builder-text">
                        <h5>Chose your template</h5>
                        <p>You can download multiple resumes completely free and as many times as you want, you just have to chose the one you like the most.</p>
                    </div>
                    <br/>
                    <div className="intro-resume-builder-img">
                        <img src={require('./images/resume-template-1.svg')} className="wireframe-img" alt="wireframe"/>
                        <img src={require('./images/resume-template-2.svg')} className="wireframe-img" alt="wireframe"/>
                        <img src={require('./images/resume-template-3.svg')} className="wireframe-img" alt="wireframe"/>
                        <img src={require('./images/resume-template-4.svg')} className="wireframe-img" alt="wireframe"/>
                    </div>

                </div>

                <div className="intro-resume-builder">

                    <div className="intro-resume-builder-text">
                        <h5>Track job applications</h5>
                        <p>Keep track of your job applications, interviews, offers and more.</p>
                    </div>

                    <div className="intro-resume-builder-img">
                        <img src={require('./images/job-tracker-8.svg')} className="job-tracker-img" alt="wireframe"/>

                    </div>

                    {/* <div className="job-tracker-svg-blob">
                        <svg width="743" height="585" viewBox="0 0 743 585"><path d="M741.275 340.61c-9.988 137.118-106.321 230.525-196.82 242.162-39.568 5.086-87.739-1.471-116.794-23.98-42.553-32.968-36.443-70.033-87.618-93.193-93.526-42.32-276.937 55.175-329.489-73.745C2.81 372.857.726 351.173.134 329.085c-.738-27.48 1.579-55.546 7.677-83.914 8.455-39.332 23.09-78.76 43.514-115.526 15.25-27.454 34.747-51.72 57.568-72.848 19.16-17.738 39.958-36.559 62.669-46.839 85.68-38.784 173.796 45.439 206.608 109.128 18.388 35.691 25.122 77.873 67.173 87.148 69.647 15.362 125.164-56.62 206.079-37.834 80.915 18.786 97.07 73.108 89.853 172.21z" fill="#F7F9FD" fillRule="evenodd"></path></svg>
                    </div> */}
                </div>
                {/* Footer */}
              <Footer />
            </div>
        )
    }
}