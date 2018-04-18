import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router';
import { fetchBooks } from '../../actions/books';
import Button from '../button';
import NotFound from '../../routes/not-found';
import PropTypes from 'prop-types';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom'

import BookIDView from '../bookIDView'
import BookIDEdit from '../bookIDEdit'
import './BookIDFetch.css';

class BookIDFetch extends Component {

    state = {
        stateUrl: null
    }

    static propTypes = {
        id: PropTypes.string,
        url: PropTypes.string
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        const { dispatch, id, url} = this.props;
        this.setState({stateUrl: url});
        dispatch(fetchBooks(`/${id}`));
    }
    
    componentDidUpdate(prevProps){
        if(this.props.url !== prevProps.url){
            const { url } = this.props;
            this.setState({ stateUrl: url })
        }
    }

    render() {
        const { isFetching, books, error, statusCode, location, id } = this.props;
        if(statusCode === 404){
            return <NotFound/>;
        }

        if(error || statusCode >= 400) {
            return (
                <p>Villa við að sækja gögn</p>  
            );
        }
    
        if (isFetching || books.length === 0) {
          return (
            <p>Sæki bók..</p>
          );
        }

        return (
            <section>
                <Route path="/books/:id/edit" render={() =><BookIDEdit books={books} id={id}/>} />
                <Route exact path="/books/:id" render={()=><BookIDView books={books} id={id}/>} />
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
  
  export default connect(mapStateToProps)(BookIDFetch);