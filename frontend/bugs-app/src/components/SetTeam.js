import React from 'react';
import axios from 'axios';
import history from '../history';
import { host } from '../config';
import { Redirect } from 'react-router-dom';

export default class SetTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            teamName: '',
            message: '',
            messageCreateTeam: '',
            messageSetTeam: '',
        }
    }

    UNSAFE_componentWillMount() {
        if (localStorage.getItem('team_id') === 'null' || localStorage.getItem('team_id') === 'undefined') {
            axios.get(`${host}/teams`)
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    return response.data;
                }).then(teams => {
                    console.log(teams);
                    this.setState({ teams });
                }).catch(error => {
                    this.setState({ message: error.response.data.message });
                })
        }
    }

    teamNameChanged(event) {
        this.setState({ teamName: event.target.value })
    }

    submitCreateTeam() {
        axios.post(`${host}/teams`, { teamName: this.state.teamName, userId: Number(localStorage.getItem('id')) })
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                return response.data;
            }).then(team => {
                localStorage.setItem('team_id', team.id);
                history.push('/team');
            }).catch(error => {
                this.setState({ messageCreateTeam: error.response.data.message });
            })
    }

    joinTeam(team) {
        axios.put(`${host}/users/team`, { userId: Number(localStorage.getItem('id')), teamId: team.id })
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                return response.data;
            }).then(() => {
                localStorage.setItem('team_id', team.id);
                history.push('/team');
            }).catch(error => {
                this.setState({ messageCreateTeam: error.response.data.message });
            })
    }

    render() {
        if (localStorage.getItem('team_id') !== 'null' && localStorage.getItem('team_id') !== 'undefined') {
            return <Redirect to="/team" />
        } else {
            return (
                <div>
                    <div>
                        <h3>Create Team</h3>
                        <label>Name:</label>
                        <input placeholder="..." onChange={this.teamNameChanged.bind(this)} />
                        <button onClick={this.submitCreateTeam.bind(this)}>Create And Join!</button>
                        <p>{this.state.messageCreateTeam}</p>
                        <h3>Join A Team</h3>
                        <ul>
                            {this.state.teams.map((team, index) => <div key={index.toString()}>
                                <span>{team.name}</span>
                                <button onClick={this.joinTeam.bind(this, team)}>Join!</button>
                            </div>)}
                        </ul>
                    </div>
                </div>
            )
        }
    }
}