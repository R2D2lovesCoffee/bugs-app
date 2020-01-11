import React from 'react';
import Bug from './Bug';
import axios from 'axios'

export default class ProjectDetailsMP extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newCommit: '',
        }
        // props: id, repo , commits, newCommitWarning
    }

    handleNewCommitChange(event) {
        this.setState({ newCommit: event.target.value });
    }

    handleAssign(bugId, commitId) {
        this.props.onAssign(bugId, commitId);
    }

    handleSolve(bugId, commitId, solvingCommitMessage) {
        this.props.onSolve(bugId, commitId, solvingCommitMessage);
    }

    handleCommit() {
        this.setState({ newCommit: '' });
        this.props.onCommit(this.state.newCommit);
    }

    render() {
        if (this.props.commits.length) {
            return (
                <div>
                    Commits:
                    {
                        this.props.commits.map((commit, index) =>
                            <div className="underline" key={index.toString()} style={{ marginLeft: '2em' }}>
                                <p>Link:{commit.link}</p>
                                <p>Message:{commit.message}</p>
                                <p onClick={() => this.props.onToggleBugs(commit)} className="toggleable">Bugs</p>
                                {commit.toggleBugs ?
                                    <div style={{ marginLeft: '2em' }}>
                                        {commit.bugs.length ?
                                            commit.bugs.map((bug, index) =>
                                                <Bug key={index.toString()} onSolve={this.handleSolve.bind(this)} onAssign={this.handleAssign.bind(this)} commitId={commit.id} id={bug.id} description={bug.description} priority={bug.priority} severity={bug.severity} alocatedUser={bug.alocatedUser} solvedCommit={bug.solvedCommit} />) :
                                            <p>There are no bugs. Go party</p>}
                                        <p>{this.state.message}</p>
                                    </div> :
                                    <></>
                                }
                            </div>
                        )
                    }
                    <input placeholder="message" value={this.state.newCommit} onChange={this.handleNewCommitChange.bind(this)} />
                    <button className="btn btn-primary" onClick={this.handleCommit.bind(this)}>Commit!</button>
                    <p>{this.props.newCommitWarning}</p>
                </div>
            )
        } else {
            return <div>
                <p>There are no commits</p>
                <input placeholder="message" value={this.state.newCommit} onChange={this.handleNewCommitChange.bind(this)} />
                <button className="btn btn-primary" onClick={() => this.props.onCommit(this.state.newCommit)}>Commit!</button>
                <p>{this.props.newCommitWarning}</p>
            </div>
        }
    }
}