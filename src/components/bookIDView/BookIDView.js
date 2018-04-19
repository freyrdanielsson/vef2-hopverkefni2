import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import { Link } from 'react-router-dom'


import './BookIDView.css';

export default class BookIDView extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    
    render() {
        const { books, id } = this.props;

        return(
            <div>
                <h2>{books.title}</h2>
                <p>{books.author && (`Eftir ${books.author}`)}</p>
                <p>{`ISBN13: ${books.isbn13}`}</p>
                <p>{books.categorytitle}</p>
                <p>{books.description}</p>
                <p>{books.pagecount && (`${books.pagecount} síður`)}</p>
                <p>{books.published && (`Gefin út ${books.published}`)}</p>
                <p>{books.language && (`Tungumál: ${books.language}`)}</p>
                <Link to={`/books/${id}/edit`}>Breyta bók</Link>
                <Button>Lesin bók</Button>
                <Button onClick={this.context.router.history.goBack}>Til baka</Button>
            </div>
        );
    }
}