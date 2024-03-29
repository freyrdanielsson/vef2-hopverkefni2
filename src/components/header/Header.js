import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Search from '../search';
import LoginHeader from '../loginHeader';

import './Header.css';

class Header extends Component {

  render() {
    
    return (
      <header className="header">
        <div className="heading">
          <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>
        </div>
        <Search/>
        <LoginHeader/>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Header);