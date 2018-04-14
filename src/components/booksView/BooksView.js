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
     * Fall sem fær inn gildi og athugar hvort það sé valid
     * fyrir 'page' parametran í Url-inu
     */
    getPage(page) {
        // Ef það var ekki tala eða var mínustala
        if(isNaN(page) || page <= 0){
            return -1;
        }
        return parseInt(page);
    }

    /**
     * Fall sem notar regular expressions og
     * Skilar object með search params og gildi þess search param.
     */
    getUrlParams(){
        const urlParams = {
            page: 1,
            query: ''
        }

        let match,
            pl     = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);

        while (match = search.exec(query)){
            urlParams[decode(match[1])] = decode(match[2]);
        }

        // Validate-a page
        urlParams.page = this.getPage(urlParams.page);
        // Skila öllum url search params
        return urlParams;
    }

    componentDidMount() {
        const { dispatch, url } = this.props;
        const params = this.getUrlParams();
        const validUrl = params.page <= 0 ? '' : `?search=${params.query}&offset=${(params.page-1)*10}&limit=10`;
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
        
        const params = this.getUrlParams();
        const bookCount = books.items ? books.items.length : 0;
        
        if(params.page <= 0 || bookCount <= 0){
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
                    <form action={`${window.location.origin}/books?query=&page=`}>
                        <input type="hidden" name="query" value={`${params.query}`} />
                        {params.page > 1 && <button name="page" type="submit" value={`${params.page - 1}`}>Fyrri Síða</button>}
                        <p>{`Síða ${params.page}`}</p>
                        {bookCount >= 10 && <button name="page" type="submit" value={`${params.page + 1}`}>Næsta Síða</button>}
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