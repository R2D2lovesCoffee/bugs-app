import React from 'react';
import axios from 'axios';
import { host } from '../config';

export default class Team extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            toggle: false,
            message: ''
        }
    }

    retrieveUsers() {
        this.setState({ toggle: !this.state.toggle });
        if (this.state.users.length === 0) {
            axios.get(`${host}/teams/${this.props.id}/users`).then(response => {
                if (response.error) {
                    throw response.error;
                }
                return response.data;
            }).then(users => {
                this.setState({ users });
            }).catch(error => {
                this.setState({ message: error.response.data.message });
            })
        }
    }

    render() {

        return (

            <div style={{ fontSize: '1.4em' }}>
                <h2 className="toggleable" onClick={this.retrieveUsers.bind(this)}>{this.props.name}</h2>
                {this.state.toggle ? <ul>{this.state.users.map((user) => <li key={user.id.toString()}>{user.email}</li>)}</ul> : <></>}
            </div>
        )
    }
}