import React, { Component } from 'react';
import Helmet from 'react-helmet';

import LoginForm from '../../components/loginForm';

class Login extends Component {

  // TODO: redirect á users/me ef notandi er loggaður inn? eða er það gert annarsstaðar

    render() {

    return (
      <LoginForm/>
    );
  }
}



export default Login;
