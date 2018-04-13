import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom'


import LoginForm from '../../components/loginForm';

class Login extends Component {

  // TODO: redirect á users/me ef notandi er loggaður inn? eða er það gert annarsstaðar

    render() {
      const { authenticated } = this.props;

    return (
      <div>
        <Helmet defaultTitle="Login" />

        <LoginForm/>

        <Link to='/register'> Ný skráning </Link>
      </div>
    );
  }
}



export default Login;
