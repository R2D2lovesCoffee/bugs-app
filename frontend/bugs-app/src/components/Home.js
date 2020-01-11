import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import history from '../history';
import { host } from '../config';
import ProjectDetailsMP from './ProjectDetailsMP';
import ProjectDetailsTST from './ProjectDetailsTST';
import Team from './Team';
import ProjectDetails from './ProjectDetails';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamId: '',
            teamName: '',
            projects: [],
            newProject: '',
            // users: [],
            me: {
                id: Number(localStorage.getItem('id')),
                email: localStorage.getItem('email'),
                role: localStorage.getItem('role'),
            },
            message: '',
            toggleMembers: false
        }
    }

    UNSAFE_componentWillMount() {
        if (localStorage.getItem('team_id') !== 'null' && localStorage.getItem('team_id') !== 'undefined') {
            axios.get(`${host}/users/${this.state.me.id}/team`)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    return response.data;
                }).then(team => {
                    this.setState({
                        teamId: team.id,
                        teamName: team.name,
                        projects: team.projects.map(project => { return { ...project, toggle: false } }),
                        message: ''
                    });
                }).catch(error => {
                    this.setState({ message: error.response.data.message });
                })
        }
    }

    handleNewProjectChange(event) {
        this.setState({ newProject: event.target.value })
    }

    handleAddProject() {
        if (this.state.newProject.length >= 4) {
            axios.post(`${host}/teams/${this.state.teamId}/projects`, { name: this.state.newProject })
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    return response.data;
                }).then(project => {
                    const projects = [...this.state.projects, project];
                    this.setState({ projects, message: '', newProject: '' });
                }).catch(error => {
                    this.setState({ message: error.response.data.message })
                })
        } else {
            this.setState({ message: 'Project name must have 4 or more characters!' });
        }
    }

    toggleProject(project) {
        const index = this.state.projects.findIndex(({ id }) => project.id === id);
        const { projects } = this.state;
        projects[index].toggle = !projects[index].toggle;
        this.setState({ projects });
    }

    render() {
        if (localStorage.getItem('team_id') === 'null' || localStorage.getItem('team_id') === 'undefined') {
            return <Redirect to="set-team" />
        } else {
            return (
                <div>
                    <Team name={this.state.teamName} id={this.state.teamId} />
                    {this.state.projects.length ? this.state.projects.map((project, index) =>
                        <div style={{ fontSize: '1.2em' }} key={index.toString()}>
                            <span className="toggleable" onClick={this.toggleProject.bind(this, project)}>{project.repo}</span>
                            {project.toggle ? <ProjectDetails id={project.id} repo={project.repo} /> : <></>}
                        </div>)
                        : <p>There Are No Projects</p>}
                    {this.state.me.role === 'MP' ?
                        <div style={{ marginTop: '3em' }}>
                            <input style={{ display: 'block' }} placeholder="project name..." value={this.state.newProject} onChange={this.handleNewProjectChange.bind(this)} />
                            <button style={{ marginTop: '1em' }} className="btn btn-primary" onClick={this.handleAddProject.bind(this)}>
                                Add Project
                            </button>
                        </div>
                        : <></>}

                    {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    </button> */}
                    {/* <ProjectModal /> */}
                    <p>{this.state.message}</p>
                </div>
            )
        }
    }
}