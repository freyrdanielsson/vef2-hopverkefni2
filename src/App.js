import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';

import Home from './routes/home';
import Login from './routes/login';
import Profile from './routes/profile';
import NotFound from './routes/not-found';

import Register from './routes/register';
import Books from './routes/books';
import BookID from './routes/bookID';

/* todo fleiri routes */

import './App.css';

class App extends Component {

  render() {
    const { isAuthenticated } = this.props;

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            {/* UserRoute renderar component ef authenticated=true annars redirectar hann */}
            <UserRoute path="/login" authenticated={!isAuthenticated} redirect="/profile" component={Login} />
            <UserRoute path="/register" authenticated={!isAuthenticated} redirect="/profile" component={Register} />
            <UserRoute path="/profile" authenticated={isAuthenticated} redirect="/login" component={Profile} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/books/:id" component={BookID} />


            {/* todo fleiri route */}
            <Route component={NotFound} />
          </Switch>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps)(App));
