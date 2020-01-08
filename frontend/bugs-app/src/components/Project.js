import React from 'react';

export default class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
        }
    }

    render() {
        return (
            <div>
                <h4>{this.state.name}</h4>
            </div>
        )
    }
}