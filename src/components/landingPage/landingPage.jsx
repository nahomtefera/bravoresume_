import React, {Component} from 'react';
import './landingPage.css'
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
                <p className="intro-text">
                        <h1 className="intro-text-title">Your go-to Resume Builder</h1>
                        <p className="intro-text-paragraph">
                            Bravoresume is a platform that gives you free unlimited access to a growing catalog of elegant resume templates. Sign-up and get started.
                        </p>
                </p>
                <div>
                    {
                        this.props.userIsLogged === true 
                            ? 
                                <Link to="/resume-builder"> 
                                        <button className="intro-buttons">Resume Builder</button>
                                </Link>
                            : <button onClick={this.props.toggleSignIn} className="intro-buttons">Sign In</button>
                    }
                </div>
            </div>
        )
    }
}