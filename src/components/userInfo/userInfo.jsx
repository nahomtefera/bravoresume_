import React, {Component} from 'react';
import './userInfo.css';

class UserInfo extends Component {

    render() {
        return(
            <div className="user-info-container resume-builder-section">
                <h1 className="resume-builder-section-title">Basic Info</h1>
                
                <div className="resume-builder-section-inner-container">
                    {/* User Name */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-name">Name</label>
                        <input className="section-input" placeholder="Jane" type="name"/>
                    </div>
                    {/* Last Name */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-last-name">Last Name</label>
                        <input className="section-input" placeholder="Doe" type="last-name"/>
                    </div>
                    {/* Email */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-email">Email</label>
                        <input className="section-input" placeholder="Email" type="email"/>
                    </div>
                    {/* Phone */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-phone">Phone</label>
                        <input className="section-input" placeholder="000-000-0000" type="telephone"/>
                    </div>
                    {/* Address */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-address">Location</label>
                        <input className="section-input" placeholder="City, State, PC" type="location"/>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserInfo