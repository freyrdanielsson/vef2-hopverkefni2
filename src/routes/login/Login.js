import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route, Redirect } from 'react-router-dom'
import LoginForm from '../../components/loginForm';

class Login extends Component {

  // TODO: redirect á users/me ef notandi er loggaður inn? eða er það gert annarsstaðar

    render() {
      const { authenticated } = this.props;

    return (
      authenticated ? <Redirect to={{pathname: '/profile'}}/> : <LoginForm/>
    );
  }
}



export default Login;
