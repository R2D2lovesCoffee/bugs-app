import React from 'react';

export default class NewBug extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            priority: 5,
            severity: 5
        }
    }

    handlePriorityChange(event) {
        this.setState({ priority: event.target.value });
    }

    handleSeverityChange(event) {
        this.setState({ severity: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    render() {
        return (
            <div style={{ marginTop: '1em' }}>
                <input placeholder="description" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} />
                <div>
                    <span>Priority:</span>
                    <select value={this.state.priority} onChange={this.handlePriorityChange.bind(this)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <span>Severity:</span>
                    <select value={this.state.severity} onChange={this.handleSeverityChange.bind(this)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button onClick={() => this.props.onAddBug({ ...this.state, commit_id: this.props.commit_id })} className="btn btn-primary">Add Bug</button>
            </div>
        )
    }
}