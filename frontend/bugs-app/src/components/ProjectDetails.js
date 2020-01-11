import React from 'react';
import ProjectDetailsMP from './ProjectDetailsMP';
import ProjectDetailsTST from './ProjectDetailsTST';

import axios from 'axios';
import { host } from '../config';

export default class ProjectDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            repo: this.props.repo,
            commits: [],
            newCommitWarning: '',
            message: '',
        }
    }

    UNSAFE_componentWillMount() {
        axios.get(`${host}/projects/${this.state.id}`)
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                return response.data;
            }).then(project => {
                project.commits = project.commits.map(commit => { return { ...commit, toggleBugs: false } })
                console.log(project.commits);
                this.setState({ ...project });
            }).catch(error => {
                console.log(error);
            })
    }

    handleCommit(message) {
        if (message.length < 4) {
            this.newCommitWarning = 'Commit message must contain at least 4 letters!';
        } else {
            axios.post(`${host}/commits`, { user_id: Number(localStorage.getItem('id')), project_id: this.state.id, message })
                .then(response => {
                    if (response.error) {
                        throw response.error;
                    }
                    return response.data;
                }).then(commit => {
                    const { commits } = this.state;
                    commits.push(commit);
                    this.setState({ commits });
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    handleAddBug(event) {
        console.log(event);
        axios.post(`${host}/commits/${event.commit_id}/bugs`, event)
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                return response.data;
            }).then(bug => {
                const { commits } = this.state;
                const index = commits.findIndex(commit => commit.id === event.commit_id);
                commits[index].bugs.push(bug);
                this.setState({ commits });
            }).catch(error => {
                console.log(error);
            })
    }

    handleToggleBugs(event) {
        const index = this.state.commits.findIndex(commit => commit.id === event.id);
        const { commits } = this.state;
        commits[index].toggleBugs = !commits[index].toggleBugs;
        this.setState({ commits });
    }

    handleAssign(bugId, commitId) {
        axios.post(`${host}/users/assign-bug`, {
            bugId, userId: Number(localStorage.getItem('id'))
        }).then(response => {
            if (response.error) {
                throw response.error;
            }
            return response.data;
        }).then(() => {
            localStorage.setItem('alocated', 'true');
            const { commits } = this.state;
            const index = commits.findIndex(commit => commit.id === commitId);
            const bugIndex = commits[index].bugs.findIndex(bug => bug.id === bugId);
            commits[index].bugs[bugIndex].alocatedUser = { id: Number(localStorage.getItem('id')), email: localStorage.getItem('email') };
            this.setState({ commits });
        }).catch(error => {
            console.log(error);
        })
    }

    handleSolve(bugId, commitId, solvingCommitMessage) {
        console.log(bugId, commitId, solvingCommitMessage);
        axios.post(`${host}/users/solve-bug`, {
            bugId, message: solvingCommitMessage, projectId: this.state.id, userId: Number(localStorage.getItem('id'))
        }).then(response => {
            if (response.error) {
                throw response.error;
            }
            return response.data;
        }).then((commit) => {
            console.log('incoming commit:', commit)
            localStorage.setItem('alocated', 'false');
            const { commits } = this.state;
            commits.push(commit);
            const index = commits.findIndex(commit => commit.id === commitId);
            const bugIndex = commits[index].bugs.findIndex(bug => bug.id === bugId);
            commits[index].bugs[bugIndex].solvedCommit = commit;
            this.setState({ commits });
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        if (localStorage.getItem('role') === 'MP') {
            return <ProjectDetailsMP onAssign={this.handleAssign.bind(this)} onSolve={this.handleSolve.bind(this)} onToggleBugs={this.handleToggleBugs.bind(this)} onCommit={this.handleCommit.bind(this)} id={this.state.id} repo={this.state.repo} commits={this.state.commits} newCommitWarning={this.state.newCommitWarning} />
        } else {
            return <ProjectDetailsTST onToggleBugs={this.handleToggleBugs.bind(this)} onAddBug={this.handleAddBug.bind(this)} id={this.state.id} repo={this.state.repo} commits={this.state.commits} newCommitWarning={this.state.newCommitWarning} />
        }
    }
}