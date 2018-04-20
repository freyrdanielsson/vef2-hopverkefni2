import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NewBook from '../../components/newBook';
import UserRoute from '../../components/user-route';

import BookIDFetch from '../../components/bookIDFetch';

class BookID extends Component {

    render() {
        const { isAuthenticated } = this.props;
        const slug = this.props.match.params.id;
        return ( slug === 'new' 
            ? <UserRoute exact path="/books/new" authenticated={isAuthenticated} redirect="/login" component={NewBook} />
            : <BookIDFetch id={slug} url={this.props.location.pathname} updatedBook={this.props.location.book}/>
        );
  }
}

const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    }
  }

export default withRouter(connect(mapStateToProps)(BookID));