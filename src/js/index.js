/**
 * Created by Nack on 2017/9/15.
 */
import React, {Component} from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';

import Login from "./components/login/login.scene";
import Home from "./components/pages/home"
import AdvancedHome from "./components/pages/advancedUserHome"

// let React = require('react');
// let ReactDOM = require('react-dom');

// var App = React.createClass({
//   render() {
//     return (
//     <h1>grammar correction system!</h1>
//     );
//   }
// });

class Root extends React.Component{

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/">
                    <IndexRoute component={Login} />
                    <Route path="home" component={Home} />
                    <Route path="advanced-home" component={AdvancedHome} />
                </Route>
            </Router>
        )
    }
}

render(<Root />, document.getElementById("container"));