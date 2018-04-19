import React, { Component } from 'react';
import Helmet from 'react-helmet';

import BookIDFetch from '../../components/bookIDFetch';

class BookID extends Component {

    render() {
        return (
            <BookIDFetch id={this.props.match.params.id} url={this.props.location.pathname} updatedBook={this.props.location.book}/>
        );
  }
}

export default BookID;