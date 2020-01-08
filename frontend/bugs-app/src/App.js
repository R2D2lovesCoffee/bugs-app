import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import {
  // BrowserRouter,
  Switch,
  Route,
  Router
} from "react-router-dom";
import history from './history';
import Home from './components/Home';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
