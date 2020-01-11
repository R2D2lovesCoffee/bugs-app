import React from 'react';
import axios from 'axios';
import history from '../history';
import { host } from '../config';
import { Link } from "react-router-dom";

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            role: 'MP',
            message: '',
        }
    }

    emailChanged(event) {
        this.setState({ email: event.target.value })
    }

    passwordChanged(event) {
        this.setState({ password: event.target.value })
    }

    confirmPasswordChanged(event) {
        this.setState({ confirmPassword: event.target.value })
    }

    handleRegister() {
        const { email, password, confirmPassword, role } = this.state;
        if (!email.length || !password.length) {
            this.setState({ message: 'Complete all fields!' });
        } else if (password !== confirmPassword) {
            this.setState({ message: 'Passwords do not match!' });
        } else {
            axios.post(`${host}/users/register`, { email, password, role })
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    return response.data;
                }).then((response) => {
                    this.setState({ message: response.message, username: '', email: '', password: '', confirmPassword: '' });
                    history.push('/login');
                }).catch(error => {
                    this.setState({ message: error.response.data.message });
                })
        }
    }

    handleRoleChange(event) {
        this.setState({ role: event.target.value });
    }

    render() {
        return (
            <div className="form register">
                <div className="inputField">
                    <input placeholder="email" value={this.state.email} onChange={(event) => this.emailChanged(event)}></input>
                </div>
                <div className="inputField">
                    <input type="password" value={this.state.password} placeholder="password" onChange={(event) => this.passwordChanged(event)}></input>
                </div>
                <div className="inputField">
                    <input type="password" value={this.state.confirmPassword} placeholder="confirm password" onChange={(event) => this.confirmPasswordChanged(event)}></input>
                </div>
                <div>
                    <span>Role</span>
                    <select onChange={this.handleRoleChange.bind(this)}>
                        <option value="MP">MP</option>
                        <option value="TST">TST</option>
                    </select>
                </div>
                <div>
                    <button className="btn btn-primary centered" onClick={this.handleRegister.bind(this)}>REGISTER</button>
                </div>
                <div>
                    <p>{this.state.message}</p>
                </div>

                <Link style={{ textDecoration: 'none', color: 'white' }} to="/login">Sign in here</Link>
            </div>
        )
    }
}