import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Team extends React.Component {

    render() {
        console.log(localStorage.getItem('team_id'));
        if (localStorage.getItem('team_id') === 'null' || localStorage.getItem('team_id') === 'undefined') {
            return <Redirect to="set-team" />
        } else {
            return (
                <div>
                    Team
                </div>
            )
        }
    }
}