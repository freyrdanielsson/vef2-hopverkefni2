import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import { Link } from 'react-router-dom';
import GiveReview from '../giveReview';


import './BookIDView.css';

export default class BookIDView extends Component {

    static contextTypes = {
        router: PropTypes.object
    }
    
    static propTypes = {
        id: PropTypes.string,
        books: PropTypes.shape()
    }

    handleBack = async () => {
        window.history.back();
    }
    
    render() {
        const { books, id } = this.props;
        return(
            <div className="bookIdpage">
                <div className="bookInfo">
                    <h2>{books.title}</h2>
                    <p>{books.author && (`Eftir ${books.author}`)}</p>
                    <p>{`ISBN13: ${books.isbn13}`}</p>
                    <p>{books.categorytitle}</p>
                    <p>{books.description}</p>
                    <p>{books.pagecount && (`${books.pagecount} síður`)}</p>
                    <p>{books.published && (`Gefin út ${books.published}`)}</p>
                    <p>{books.language && (`Tungumál: ${books.language}`)}</p>
                    <Link to={`/books/${id}/edit`}>Breyta bók</Link>
                </div>
                <div className="buttonHolder">
                    <div className="readBook">
                        <GiveReview id={id}/>
                    </div>
                    <div>     
                        <Button onClick={this.handleBack}>Til baka</Button>
                    </div>
                </div>
            </div>
        );
    }
}