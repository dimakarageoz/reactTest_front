import React from 'react';
import {
    StaticRouter, // for server rendering
    Route,
    Switch,
    Redirect,
    Link
} from 'react-router-dom';
import Setup from './Components/Setup.jsx';
import Login from './Components/Login.jsx';
import Home from './Components/Home.jsx';
import { getToken } from './Services/helper.js'
import './Styles/index.scss';
import './Styles/clear-style.css';
import 'material-design-icons'

const App = () => 
    <Switch>        
        <Route exact path="/setup" render={() => (
            getToken() ? (
                <Redirect to="/" />
            ) : (
                    <Setup />
                )
        )} />   
        
        <Route exact path="/login" render={() => (
            getToken() ? (
                <Redirect to="/" />
            ) : (
                    <Login />
                )
        )} />
        
        <Route exact path="/" render={() => (
            !getToken() ? (
                <Redirect to="/login" />
            ) : (
                    <Home />
                )
        )} />
    </Switch>;
export default App;