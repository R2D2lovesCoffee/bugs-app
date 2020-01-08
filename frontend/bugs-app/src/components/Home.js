import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import history from '../history';
import { host } from '../config';
import Project from './Project';
import Team from './Team';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamId: '',
            teamName: '',
            projects: [],
            // users: [],
            me: {
                id: Number(localStorage.getItem('id')),
                email: localStorage.getItem('email'),
                role: localStorage.getItem('role'),
            },
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
                    console.log(team);
                    this.setState({
                        teamId: team.id,
                        teamName: team.name,
                        projects: team.projects,
                        // users: team.users
                    });
                }).catch(error => {
                    this.setState({ message: error.response.data.message });
                })
        }
    }

    render() {
        console.log(localStorage.getItem('team_id'));
        if (localStorage.getItem('team_id') === 'null' || localStorage.getItem('team_id') === 'undefined') {
            return <Redirect to="set-team" />
        } else {
            return (
                <div>
                    <Team name={this.state.teamName} id={this.state.teamId} />
                    {this.state.projects.length ? this.state.projects.map((project, index) =>
                        <Project />)
                        : <h4>There Are No Projects</h4>}
                </div>
            )
        }
    }
}