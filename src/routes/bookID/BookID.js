import React, { Component } from 'react';
import Helmet from 'react-helmet';

import BookIDView from '../../components/bookIDView';

class BookID extends Component {

    render() {
        return (
            <BookIDView id={this.props.match.params.id} />
        );
  }
}

export default BookID;