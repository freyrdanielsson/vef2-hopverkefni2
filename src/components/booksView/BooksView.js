import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import { fetchBooks } from '../../actions/books';
import Button from '../button';

import './BooksView.css';

class BooksView extends Component {

    static propTypes = {
        url: PropTypes.string,
    }

    handlePrev = (e) => {
        console.log('handleclick');
        const { dispatch, url } = this.props;
        const validUrl = `?offset=${(this.getPage()-1)*10}&limit=10`;
        dispatch(fetchBooks(validUrl));    
    }
    handleNext = (e) => {
        console.log('handleclick');
        const { dispatch, url } = this.props;
        const validUrl = `?offset=${(this.getPage()+1)*10}&limit=10`;
        dispatch(fetchBooks(validUrl));    
    }

    /**
     * Sækja gildi á ?page= í Url-i
     * Ef það er ekki valid eða aðrir search params þá skila 1
     * annars skila page
     */
    getPage() {
        console.log('hello');
        const { url } = this.props;
        let numPage = 'NaN';
        const pair = url.split('=');
        if (decodeURIComponent(pair[0]) === '?page') {
            numPage = decodeURIComponent(pair[1]);
        }

        if(isNaN(numPage) || numPage <= 0){
            return 0;
        }
        return parseInt(numPage);
    }

    componentDidMount() {
        const { dispatch, url } = this.props;
        const validUrl = `?offset=${(this.getPage())*10}&limit=10`;
        dispatch(fetchBooks(validUrl));
    } 

    render() {
        const { isFetching, books, error, statusCode, location } = this.props;

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
        
        const page = books.items ? this.getPage() : 0;
        const bookCount = books.items ? books.items.length : 0;
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
            {bookCount > 0 && (
                <div>
                    {page > 0 && 
                        <Button onClick={this.handlePrev}>
                            <Link to={`/books?page=${this.getPage() - 1}`}>Fyrri Síða</Link>
                        </Button>
                    }
                    <p>{`Síða ${page+1}`}</p>
                    <Button onClick={this.handleNext}>
                        <Link to={`/books?page=${this.getPage() + 1}`}>Næsta Síða</Link>
                    </Button>
                </div>
            )}
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