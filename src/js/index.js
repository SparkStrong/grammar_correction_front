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
    constructor(props) {
        super(props);
        console.log("root")
        this.token = sessionStorage.getItem('access_token');
    }

    requireAuth(nextState, replace) {
        console.log("token: ", this.token);
        if (sessionStorage.getItem('access_token') == null) {
            console.log("not logged in.");
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname }
            })
        }
        // if (this.isGuest) {
        //     console.log("guest")
        //     replace({
        //       pathname: '/login',
        //       state: { nextPathname: nextState.location.pathname }
        //     })
        // }
    }

    handleUserIdChange(userId) {
        console.log("nothing useful.");
    }

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" >
                    <IndexRoute component={Login} />
                    {/*<IndexRoute component={() => <Login userStateOnChange={this.handleUserIdChange.bind(this)}/>}/>  
                    <Route path="login" component={() => <Login userStateOnChange={this.handleUserIdChange.bind(this)}/>} />*/}
                    <Route path="login" component={Login} />
                    <Route path="home" component={Home} onEnter={this.requireAuth.bind(this)} />
                    <Route path="advanced-home" component={AdvancedHome} onEnter={this.requireAuth.bind(this)} />
                </Route>
            </Router>
        )
    }
}

render(<Root />, document.getElementById("container"));