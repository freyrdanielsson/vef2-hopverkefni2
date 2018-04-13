import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom';

import { fetchBooks } from '../../actions/books';

import './BooksView.css';

class BooksView extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchBooks());
    }

    render() {
        const { isFetching, books, error, statusCode } = this.props;
        console.log(statusCode);
        if(error || statusCode >= 400) {
            return (
                <p>Villa við að sækja gögn</p>  
            );
        }
        
    
        if (isFetching) {
          return (
            <p>Sæki bækur..</p>
          );
        }
    
        return (
          <section>
            <h2>Bækur</h2>
            <ul>
                {books.items && (
                    books.items.map((book) => {
                return (
                   <li key={book.id}>
                        <Link to={`/books/${book.id}`}>{book.title}</Link>
                        <p>
                            {book.author && (`Eftir ${book.author}`)}
                            {book.published && (`, gefin út ${book.published}`)}
                        </p>
                   </li>
                )
              }))}
            </ul>
          </section>
        );
    }

}

const mapStateToProps = (state) => {
    return {
      isFetching: state.books.isFetching,
      books: state.books.books,
      error: state.books.error,
      statusCode: state.books.statusCode,
    }
  }
  
  export default connect(mapStateToProps)(BooksView);