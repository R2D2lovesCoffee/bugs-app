import React from 'react';
import {
  Switch,
  Route,
  Router
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';
import history from './history';
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
          <Route path="/home">
            <Home />
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
