import React, {Component} from 'react';
import './userInfo.css';
// Firebase
import firebase from 'firebase/app';

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

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(el){
        let val = el.target.value;
        let id = el.target.id;
        let update = {}
        update[id] = val;

        firebase.database().ref(`users/${this.props.userId}/user_info/`).update(update)

        this.props.update()

        this.setState({
            [id]: val
        })
    }

    render() {
        return(
            <div className="user-info-container resume-builder-section">
                <h1 className="resume-builder-section-title">Basic Info</h1>
                
                <div className="resume-builder-section-inner-container">
                    {/* User Name */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-name">Name</label>
                        <input autoComplete="off" className="section-input" id="name" placeholder="Jane" onChange={this.handleChange} value={this.state.name} type="name"/>
                    </div>
                    {/* Last Name */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-last-name">Last Name</label>
                        <input autoComplete="off" className="section-input" id="last_name" placeholder="Doe" onChange={this.handleChange} value={this.state.last_name} type="last-name"/>
                    </div>
                    {/* Email */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-email">Email</label>
                        <input autoComplete="off" className="section-input" id="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} type="email"/>
                    </div>
                    {/* Phone */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-phone">Phone</label>
                        <input autoComplete="off" className="section-input" id="phone" placeholder="000-000-0000" onChange={this.handleChange} value={this.state.phone} type="telephone"/>
                    </div>
                    {/* Address */}
                    <div className="user-info-name section-input-container">
                        <label className="section-input-label" htmlFor="user-address">Location</label>
                        <input autoComplete="off" className="section-input" id="location" placeholder="City, State, PC" onChange={this.handleChange} value={this.state.location} type="location"/>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserInfo