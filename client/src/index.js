import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={ Login }/>
        <Route path="/dashboard" component={ Dashboard }/>
      </Switch>
    </BrowserRouter>, document.getElementById('root')
);

