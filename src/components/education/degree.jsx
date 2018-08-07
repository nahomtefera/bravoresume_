import React, {Component} from 'react';
import './education.css';
// Firebase
import firebase from 'firebase'

class Degree extends Component {
    
    constructor(props){
        super(props);
        let degree_info = this.props.degree_info;

        this.state = {
            id: degree_info.id,
            date: degree_info.date,
            degree: degree_info.degree,
            school: degree_info.school
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(el){
        let val = el.target.value;
        let id = el.target.id;
        let update = {}
        update[id] = val;

        firebase.database().ref(`users/${this.props.userId}/education/${this.state.id}`).update(update)

        this.props.update()
        this.setState({
            [id]: val
        })

    }

    render() {
        return(
            <div className="resume-builder-section-inner-container">
                {/* Degree*/}
                <div className="education-degree section-input-container">
                    <label className="section-input-label" htmlFor="education-degree">Degree</label>
                    <input autoComplete="off" className="section-input" id="degree" onChange={this.handleChange} value={this.state.degree} placeholder="Computer Science" type="name"/>
                </div>
                {/* Last Name */}
                <div className="education-school section-input-container">
                    <label className="section-input-label" htmlFor="user-last-name">School</label>
                    <input autoComplete="off" className="section-input" id="school" onChange={this.handleChange} value={this.state.school} placeholder="Stanford" type="education-school"/>
                </div>
                {/* Date */}
                <div className="education-date section-input-container">
                    <label className="section-input-label" htmlFor="education-date">Date</label>
                    <input autoComplete="off" className="section-input" id="date" onChange={this.handleChange} value={this.state.date} placeholder="Year" type="text"/>
                </div>
                
            </div>
        )
    }

}

export default Degree