import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { fetchBooks } from '../../actions/books';
import Button from '../button';
import NotFound from '../../routes/not-found';
import PropTypes from 'prop-types';

import './BookIDView.css';

class BookIDView extends Component {

    static propTypes = {
        id: PropTypes.string,
    }

    componentDidMount() {
        const { dispatch, id } = this.props;
        dispatch(fetchBooks(`/${id}`));
    } 

    render() {
        const { isFetching, books, error, statusCode, location } = this.props;
        if(statusCode === 404){
            return <NotFound/>;
        }

        if(error || statusCode >= 400) {
            return (
                <p>Villa við að sækja gögn</p>  
            );
        }
    
        if (isFetching) {
          return (
            <p>Sæki bók..</p>
          );
        }

        return (
            <section>
                {books.length !== 0 && (
                    <div>
                        <h2>{books.title}</h2>
                        <p>{books.author && (`Eftir ${books.author}`)}</p>
                        <p>{`ISBN13: ${books.isbn13}`}</p>
                        <p>{books.categorytitle}</p>
                        <p>{books.description}</p>
                        <p>{books.pagecount && (`${books.pagecount} síður`)}</p>
                        <p>{books.published && (`Gefin út ${books.published}`)}</p>
                        <p>{books.language && (`Tungumál: ${books.language}`)}</p>
                        <Link to="">Breyta bók</Link>
                        <Button>Lesin bók</Button>
                        <Button>Til baka</Button>
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
  
  export default connect(mapStateToProps)(BookIDView);