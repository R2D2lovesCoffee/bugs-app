import React from 'react';
import Bug from './Bug';
import NewBug from './NewBug';

export default class ProjectDetailsTST extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleBugs: false,
            message: '',
        }
        // props: id, repo , commits, newCommitWarning
    }

    handleAddBug(event) {
        if (event.description.length < 4) {
            this.setState({ message: 'Bug description must contain at least 4 characters' })
        } else {
            this.setState({ message: '' });
            this.props.onAddBug(event);
        }
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
                                            commit.bugs.map((bug, index) => <Bug key={index.toString()} description={bug.description} priority={bug.priority} severity={bug.severity} />) :
                                            <p>There are no bugs</p>}
                                        <NewBug onAddBug={this.handleAddBug.bind(this)} commit_id={commit.id} />
                                        <p>{this.state.message}</p>
                                    </div> :
                                    <></>
                                }
                                {/* {this.state.toggleBugs ? commit.bugs.map((bug, index) => <Bug key={index.toString()} description={bug.description} priority={bug.priority} severity={bug.severity} />) : <></>} */}
                            </div>
                        )
                    }
                </div>
            )
        } else {
            return <div>There are no commits to this project</div>
        }
    }
}