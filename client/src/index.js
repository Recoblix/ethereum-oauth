import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { HashRouter, Route } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <Route path="/" component={ App }/>
    </HashRouter>, document.getElementById('root')
);

