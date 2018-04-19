import React, { Component } from 'react';
import Helmet from 'react-helmet';

import UsersList from '../../components/usersList';

class Users extends Component {

    render() {
    return (
      <div>
        <Helmet defaultTitle="Notendur" />
        <UsersList className="users"/>
      </div>
    );
  }
}



export default Users;
