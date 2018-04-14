import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import { fetchBooks } from '../../actions/books';
import Button from '../button';
import NotFound from '../../routes/not-found';

import './BooksView.css';

class BooksView extends Component {

    static propTypes = {
        url: PropTypes.string,
    }

    /**
     * Sækja gildi á ?page= í Url-i
     * Ef það er ekki valid eða aðrir search params þá skila -1
     * annars skila page
     */
    getPage() {
        // Sækja url sem var sent inn
        const { url } = this.props;
        // Ath hvort við séum á /books (þá sendur inn '') sem er löglegt
        if(url === ''){
            return 1;
        }
        // Sækja params og ath hvort einhver þeirra sé ?page
        let numPage = 'NaN';
        const pair = url.split('=');
        if (decodeURIComponent(pair[0]) === '?page') {
            numPage = decodeURIComponent(pair[1]);
        }

        // Ath hvort gildið við ?page var til eða var tala
        if(isNaN(numPage) || numPage <= 0){
            return -1;
        }
        return parseInt(numPage);
    }

    componentDidMount() {
        const { dispatch, url } = this.props;
        const validUrl = `?offset=${(this.getPage()-1)*10}&limit=10`;
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
        
        const page = this.getPage()
        const bookCount = books.items ? books.items.length : 0;
        const urlOrigin = window.location.origin;
        console.log('page: ' + page);
        console.log('bookCount: ' + bookCount);
        
        if(page <= 0 || bookCount <= 0){
            return <NotFound/>;
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
            {bookCount > 0 && (
                <div>
                    <form action={`${urlOrigin}/books?page=`}>
                        {page > 1 && <button name="page" type="submit" value={`${page - 1}`}>Fyrri Síða</button>}
                        <p>{`Síða ${page}`}</p>
                        {bookCount >= 10 && <button name="page" type="submit" value={`${page + 1}`}>Næsta Síða</button>}
                    </form>
                   
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