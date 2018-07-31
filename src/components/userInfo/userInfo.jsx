import React, {Component} from 'react';
import './userInfo.css';

class UserInfo extends Component {

    constructor(props) {
        super(props)
        let user_info = this.props.user_info

        this.state ={
            name: user_info.name,
            last_name: user_info.last_name,
            email: user_info.email,
            phone: user_info.phone,
            location: user_info.location
        }
    }

    render() {
        return(
            <div className="user-info-container resume-builder-section">
                <h1 className="resume-builder-section-title">Basic Info</h1>
                
                <div className="resume-builder-section-inner-container">
                    {/* User Name */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-name">Name</label>
                        <input className="section-input" placeholder="Jane" value={this.state.name} type="name"/>
                    </div>
                    {/* Last Name */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-last-name">Last Name</label>
                        <input className="section-input" placeholder="Doe" value={this.state.last_name} type="last-name"/>
                    </div>
                    {/* Email */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-email">Email</label>
                        <input className="section-input" placeholder="Email" value={this.state.email} type="email"/>
                    </div>
                    {/* Phone */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-phone">Phone</label>
                        <input className="section-input" placeholder="000-000-0000" value={this.state.phone} type="telephone"/>
                    </div>
                    {/* Address */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-address">Location</label>
                        <input className="section-input" placeholder="City, State, PC" value={this.state.location} type="location"/>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserInfo