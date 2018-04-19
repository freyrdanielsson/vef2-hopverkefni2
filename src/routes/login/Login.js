import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom'


import LoginForm from '../../components/loginForm';

class Login extends Component {

    render() {
      const { authenticated } = this.props;

    return (
      <div>
        <Helmet title="Innskráning" />

        <LoginForm/>

        <Link to='/register'> Ný skráning </Link>
      </div>
    );
  }
}



export default Login;
