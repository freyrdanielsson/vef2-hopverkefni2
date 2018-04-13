import React, { Component } from 'react';
import Helmet from 'react-helmet';

import BooksView from '../../components/booksView';

class Books extends Component {
    render() {
        return (
            <BooksView/>
        );
  }
}

export default Books;