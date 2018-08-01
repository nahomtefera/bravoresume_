import React, {Component} from 'react';
import './education.css';
import Degree from './degree';
// Firebase
import firebase from 'firebase/app';

class Education extends Component {

    constructor(props) {
        super(props);
        let degrees = this.props.education;

        this.state = {
            degrees: degrees
        }

        this.addDegree = this.addDegree.bind(this);
        this.remDegree = this.remDegree.bind(this);
    }

    componentWillMount(){
        let degrees = this.state.degrees;
        let degreeArr = []
        // loop through jobs and push them to array
        for(var id in degrees) {
            degreeArr.push(degrees[id])
        }

        this.setState({
            degrees: degreeArr
        })
    }

    addDegree(){
        let timestamp = Date.now()
        let prevDegrees = this.state.degrees;

        prevDegrees.push({
            id: timestamp,
            degree: "", 
            school: "",
            date: "",
        })

        firebase.database().ref().child('/users/nahom/education/' + timestamp)
        .update({
            id: timestamp,
            degree: "", 
            school: "",
            date: "",
        });

        this.props.update()
        this.setState({
            degrees: prevDegrees
        })
    }
    
    remDegree(el) {
        let id = el.target.parentNode.id;
        let prevDegrees = this.state.degrees;
        let newDegrees = this.state.degrees;

        for(let i=0; i<this.state.degrees.length; i++) {

            if(prevDegrees[i].id == id) {
                newDegrees.splice(i, 1)
            } 

        }
        firebase.database().ref().child('/users/nahom/education/' + id).remove()

        this.props.update()
        
        this.setState({
            degrees: newDegrees
        })
 
    }

    render() {
        return(
            <div className="education-container resume-builder-section">
                <h1 className="resume-builder-section-title">Education</h1>
                
                <div className="resume-builder-section-inner-container">
                   {
                        this.state.degrees.length > 0
                            ? this.state.degrees.map((degree)=>{
                                return <div key={degree.id}  id={degree.id}>
                                    <button onClick={this.remDegree}>Remove Degree</button>
                                    <Degree update={this.props.update} degree_info={degree} />
                                </div>
                              })
                            : 'No degrees'
                   }
                </div>

                <button onClick={this.addDegree}>Add Degree</button>
            </div>
        )
    }

}

export default Education