import React from 'react';
import { host } from '../config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import history from '../history';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
        }
    }

    emailChanged(event) {
        this.setState({ email: event.target.value });
    }
    passwordChanged(event) {
        this.setState({ password: event.target.value });
    }

    handleLogin() {
        const { email, password } = this.state;
        axios.post(`${host}/users/login`, { email, password })
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                return response.data;
            })
            .then(data => {
                console.log(data);
                localStorage.setItem('id', data.id);
                localStorage.setItem('email', data.email);
                localStorage.setItem('role', data.role);
                localStorage.setItem('team_id', data.team_id);
                if (data.team_id !== null) {
                    history.push('/home');
                } else {
                    history.push('/set-team');
                }
            }).catch(error => {
                this.setState({ message: error.response.data.message });
            })
    }

    render() {
        return (
            <div className="form login">
                <div className="inputField">
                    <input placeholder="email" onChange={this.emailChanged.bind(this)}></input>
                </div>
                <div className="inputField">
                    <input type="password" placeholder="password" onChange={this.passwordChanged.bind(this)}></input>
                </div>
                <div>
                    <button className="btn centered" onClick={this.handleLogin.bind(this)}>LOGIN</button>
                </div>
                <div>
                    <p>{this.state.message}</p>
                </div>
                <Link style={{ textDecoration: 'none', color: 'white' }} to="/register">Sign up here</Link>
            </div>
        )
    }
}