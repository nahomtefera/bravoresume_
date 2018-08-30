import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './footer.css';

export default class Footer extends Component {

    render(){
        return(
            <div className="footer-container">

                <h4 className="footer-copyright">
                    © bravoresume 2018
                </h4>

                <div className="footer-links">
                    <Link to="/privacy-policy">
                        <h4>Privacy-Policy</h4>
                    </Link>

                </div>
            </div>
        )
    }
}