import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Team from './components/Team';
import './App.css';
import {
  // BrowserRouter,
  Switch,
  Route,
  Router
} from "react-router-dom";
import history from './history';
import NoTeam from './components/SetTeam';
import SetTeam from './components/SetTeam';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/team">
            <Team />
          </Route>
          <Route path="/set-team">
            <SetTeam />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
