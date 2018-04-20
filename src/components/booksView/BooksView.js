import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchBooks } from '../../actions/books';
import Button from '../button';
import NotFound from '../../routes/not-found';

import './BooksView.css';

class BooksView extends Component {

    state = { page: 1}

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
        return parseInt(page, 10);
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

        while((match = search.exec(query)) !== null){
            urlParams[decode(match[1])] = decode(match[2]);
        }

        // Validate-a page
        urlParams.page = this.getPage(urlParams.page);
        // Skila öllum url search params
        return urlParams;
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const params = this.getUrlParams();
        this.setState({ page: params.page });
        const validUrl = params.page <= 0 ? '' : `?search=${params.query}&offset=${(params.page-1)*10}&limit=10`;
        dispatch(fetchBooks(validUrl));
    } 

    componentDidUpdate(prevProps){
        if(this.props.url !== prevProps.url){
            const { dispatch } = this.props;
            const params = this.getUrlParams();
            this.setState({ page: params.page });
            const validUrl = params.page <= 0 ? '' : `?search=${params.query}&offset=${(params.page-1)*10}&limit=10`;
            dispatch(fetchBooks(validUrl));
        }
    }

    handleChange = async (searchQuery, pageNr) => {
        window.history.pushState(null, '', `/books?query=${searchQuery}&page=${pageNr}`);
        const { dispatch } = this.props;
        this.setState({page: pageNr});
        const validUrl = pageNr <= 0 ? '' : `?search=${searchQuery}&offset=${(pageNr-1)*10}&limit=10`;
        dispatch(fetchBooks(validUrl));

    }

    render() {
        const { isFetching, books, error, statusCode } = this.props;
        const { page } = this.state;
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
        
        if(page <= 0){
            return <NotFound/>;
        }

        const heading = params.query ? `Bókaleit: ${params.query}` : 'Bækur';
        const helmet = page === 1 ? 'Bækur' : `Bækur, síða ${page}`
        return (
          <section>
            <Helmet title={helmet} />
            <h2 className="bookHeading">{heading}</h2>
            {bookCount === 0 && <p>Engar bækur fundust</p>}
            <ul>
                {books.items && (
                    books.items.map((book) => {
                return (
                   <li key={book.id} className="bookList">
                        <Link to={`/books/${book.id}`} className="bookLink">{book.title}</Link>
                        <p>
                            {book.author && (`Eftir ${book.author}`)}
                            {book.published && (`, gefin út ${book.published}`)}
                        </p>
                   </li>
                )
              }))}
            </ul>
            {bookCount > 0 && (
                <div className="buttonLayout">
                    {page > 1 && <Button onClick={() => this.handleChange(params.query, page - 1)} className="pageButton">Fyrri Síða</Button>}
                    <div className="pageHolder">
                        <p className="page">{`Síða ${page}`}</p>
                    </div>
                    {bookCount >= 10 && <Button onClick={() => this.handleChange(params.query, page + 1)} className="pageButton">Næsta Síða</Button>}
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