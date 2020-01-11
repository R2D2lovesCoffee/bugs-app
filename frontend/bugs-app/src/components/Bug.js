import React from 'react';

export default class Bug extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solvingCommitMessage: '',
            message: '',
        }
    }

    handleMessageChanged(event) {
        this.setState({ solvingCommitMessage: event.target.value })
    }

    handleSolve() {
        if (this.state.solvingCommitMessage.length >= 4) {
            this.props.onSolve(this.props.id, this.props.commitId, this.state.solvingCommitMessage)
        } else {
            this.setState({ message: 'Commit message must contain at least 4 characters!' });
        }
    }

    render() {
        return (
            <div style={{ width: '30%', borderBottom: '1px solid yellow' }}>
                <p>Description:{this.props.description}</p>
                <p>Priority: {this.props.priority}</p>
                <p>Severity: {this.props.severity}</p>
                {this.props.alocatedUser ? <p>Alocated to {this.props.alocatedUser.email}</p> : <p>Unalocated</p>}
                {this.props.solvedCommit ? <p>Solved with commit {this.props.solvedCommit.link}</p> : <p>Unsolved</p>}
                {localStorage.getItem('alocated') === 'false' && localStorage.getItem('role') === 'MP' && (this.props.alocatedUser === null) ? <button className="btn btn-primary" onClick={() => this.props.onAssign(this.props.id, this.props.commitId)}>Assign yourself</button> : <></>}
                {this.props.alocatedUser && Number(localStorage.getItem('id')) === this.props.alocatedUser.id && this.props.solvedCommit === null ?
                    <div>
                        <input value={this.state.solvingCommitMessage} onChange={this.handleMessageChanged.bind(this)} placeholder="Commit message" />
                        <button className="btn btn-primary" onClick={this.handleSolve.bind(this)}>Solve</button>
                        <p>{this.state.message}</p>
                    </div>
                    : <></>}
            </div>
        )
    }
}