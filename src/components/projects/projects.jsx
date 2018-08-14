import React, {Component} from 'react';
import Project from './project'
// Firebase
import firebase from 'firebase/app';

class Projects extends Component {
    
    constructor(props) {
        super(props);
        let projects = this.props.projects;

        console.log(this.props)
        this.state = {
            projects: projects || [],
            showProject: null
        }

        this.addProject = this.addProject.bind(this);
        this.remProject = this.remProject.bind(this);
        this.toggleProject = this.toggleProject.bind(this);
    }
    
    componentWillMount(){
        let projects = this.state.projects;
        let newProjects = []
        // loop through projects and push them to array
        for(var id in projects) {
            newProjects.push(projects[id])
        }

        this.setState({
            projects: newProjects,
            showProject: newProjects[0].id
        })
    }

    addProject(){
        let timestamp = Date.now()
        let prevProjects = this.state.projects;

        prevProjects.push({
            id: timestamp,
            company: "", 
            title: "",
            location: "",
            date: "",
            bullet_points: []
        })

        firebase.database().ref().child(`users/${this.props.userId}/projects/` + timestamp)
        .update({
            id: timestamp,
            company: "", 
            title: "",
            location: "",
            date: "",
            bullet_points: []
        });

        this.props.update()
        this.setState({
            projects: prevProjects,
            showProject: timestamp
        })
    }
    
    remProject(el) {
        let id = el.target.parentNode.id;
        let prevProjects = this.state.projects;
        let newProjects = this.state.projects;

        for(let i=0; i<this.state.projects.length; i++) {

            if(prevProjects[i].id == id) {
                newProjects.splice(i, 1)
            } 

        }
        firebase.database().ref().child(`users/${this.props.userId}/projects/` + id).remove()
        this.props.update()
        
        this.setState({
            projects: newProjects,
            showProject: newProjects[newProjects.length -1].id
        })
 
    }

    toggleProject(el) {
        let id = el.target.id;
        this.setState({showProject: id})
    }

    render() {
        return(
            <div>
                <div className="work-experience-container resume-builder-section">
                    <h1 className="resume-builder-section-title"> <object type="image/svg+xml" className="resume-builder-section-title-icon" data={require('../images/travel-case.svg')}></object> Projects</h1>
                    <div className="bullet-nav-container">
                        {this.state.projects.length > 0 
                            ? this.state.projects.map((project)=>{
                                return <span onClick={this.toggleProject} className={this.state.showProject == project.id ? "bullet-nav-item-selected" : "bullet-nav-item"} key={`job-${project.id}`} id={project.id} >•</span>
                            })
                            : ""
                        } 
                    </div>
                    {
                        this.state.projects.length > 0 
                            ? this.state.projects.map((project)=>{
                                return <div className={this.state.showProject == project.id ? "job-outer-container" : "hide"} key={project.id} id={project.id}>
                                    <button className="rem-button" onClick={this.remProject}>Remove project</button>
                                    <Project userId={this.props.userId} update={this.props.update} project_info={project}/>
                                </div>
                            })
                            : <button className="add-info" onClick={this.addProject}>Add new Project</button>  
                    }
                </div>

                {
                    this.state.projects.length > 0 
                        ? <button className="add-info" onClick={this.addProject}>Add new Project</button>
                        : ""
                }
            </div>

        )
    }

}

export default Projects