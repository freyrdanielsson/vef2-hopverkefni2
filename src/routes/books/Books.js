import React, { Component } from 'react';
import BooksView from '../../components/booksView';

class Books extends Component {

    render() {
        return (
            <BooksView  url={this.props.location.search}/>
        );
  }
}

export default Books;