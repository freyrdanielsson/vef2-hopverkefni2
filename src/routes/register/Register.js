import React, { Component } from 'react';
import Helmet from 'react-helmet';

import RegisterForm from '../../components/registerForm';

class Register extends Component {

    render() {
      console.log('register rout');
      

    return (
      <div>
        <Helmet defaultTitle="Login" />
        <RegisterForm/>
      </div>
    );
  }
}



export default Register;
