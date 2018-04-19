import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router';
import { fetchBooks } from '../../actions/books';
import { fetchCategories } from '../../actions/categories';
import Button from '../button';
import NotFound from '../../routes/not-found';
import PropTypes from 'prop-types';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom'

import BookIDView from '../bookIDView'
import BookIDEdit from '../bookIDEdit'
import './BookIDFetch.css';

class BookIDFetch extends Component {

    state = {
        stateBook: null,
    }

    static propTypes = {
        id: PropTypes.string,
        url: PropTypes.string,
        updatedBook: PropTypes.shape()
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        const { dispatch, id, url, } = this.props;
        dispatch(fetchBooks(`/${id}`));
        dispatch(fetchCategories());
    }
    
    componentDidUpdate(prevProps){
        if(this.props.url !== prevProps.url){
            const { url, updatedBook } = this.props;
            updatedBook && this.setState({ stateBook: updatedBook});
        }
    }

    render() {
        const { isFetching, books, error, statusCode, id, url, fetchingCategories, 
                categoryError, categorieStatusCode, categories } = this.props;
        const { stateBook } = this.state;
        const thisBook = stateBook ? stateBook : books;

        if(statusCode === 404){
            return <NotFound/>;
        }

        if(error || statusCode >= 400 || categoryError || categorieStatusCode >= 400) {
            return (
                <p>Villa við að sækja gögn</p>  
            );
        }
    
        if (isFetching || books.length === 0 || fetchingCategories || categories.length === 0) {
          return (
            <p>Sæki bók..</p>
          );
        }
        return (
            <section>
                <Route path="/books/:id/edit" render={() =><BookIDEdit books={thisBook} id={id} categories={categories.items}/>} />
                <Route exact path="/books/:id" render={()=><BookIDView books={thisBook} id={id}/>} />
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
      fetchingCategories: state.categories.fetchingCategories,
      categoryError: state.categories.categoryError,
      categories: state.categories.categories,
      categorieStatusCode: state.categories.statusCode
    }
  }
  
  export default connect(mapStateToProps)(BookIDFetch);