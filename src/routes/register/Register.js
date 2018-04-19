import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom'

import RegisterForm from '../../components/registerForm';

class Register extends Component {

    render() {
      console.log('register rout');
      

    return (
      <div>
        <Helmet defaultTitle="Nýskráning" />
        <RegisterForm/>

        <Link to='/login'>Innskráning</Link>
      </div>
    );
  }
}



export default Register;
