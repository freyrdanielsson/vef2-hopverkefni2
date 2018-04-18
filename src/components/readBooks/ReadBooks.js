import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { fetchRead } from '../../actions/me';
import Button from '../button';
import NotFound from '../../routes/not-found';
// import NotFound from '../../routes/not-found';

import './ReadBooks.css';

/**
 * 
 * @param {*} event - Back takki í browser
 * Refreshar síðu ef að ýtt er á back takka (Button component)
 */
window.onpopstate = function(event) {
    window.location.reload();
  };

class ReadBooks extends Component {
    state = { page: 0 }
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
        const params = this.getUrlParams();
        const { dispatch } = this.props;
        this.setState({page: params.page});
        const validUrl = params.page <= 0 ? '' : `?offset=${(params.page-1)*10}`;
        dispatch(fetchRead(validUrl, this.props.className));
    }

    handleDelete = async (id) => {
        console.log(id);

		const { dispatch } = this.props;
		
    }
    
    handleChange = async (pageNr) => {
        this.setState({page: pageNr});
        window.history.pushState(null, '', `/profile?page=${pageNr}`);
        
        const { dispatch } = this.props;
        const validUrl = pageNr <= 0 ? '' : `?offset=${(pageNr-1)*10}`;
        dispatch(fetchRead(validUrl, this.props.className));
    }

    render() {
        const { books, isFetching, className } = this.props;
        
        const page = this.state.page;
                
        const bookCount = books ? books.length : 0;

        if (isFetching === className) {
			return (
			<div>
				<p><em>Hleð bækur...</em></p>
			</div>
			);
        }
        
        if(page <= 0 || bookCount <= 0){
            return <NotFound/>;
        }
        
        return (
            <div>
                <ul>
                    {books && (
                        books.map((book) => {
                    return (
                    <li key={book.id}>
                            <Link to={`/books/${book.book_id}`}>{book.title}</Link>
                            <div>
                                <p>{book.rating && (`Einkun: ${book.rating}`)}</p>
                            </div>
                            <div>
                                <p>{book.review && (`Um bók: ${book.review}`)}</p>
                            </div>
                            <Button className="delete" onClick={() => this.handleDelete(book.id)}>Eyða</Button>
                    </li>
                    )
                    }))}
                </ul>
                {bookCount > 0 && (
                <div>
                    {page > 1 && <Button onClick={() => this.handleChange(page - 1)}>Fyrri Síða</Button>}
                    <p>{`Síða ${page}`}</p>
                    {bookCount >= 10 && <Button onClick={() => this.handleChange(page + 1)}>Næsta Síða</Button>}
                </div>
            )}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isFetching: state.me.isFetching,
        books: state.me.books,
    }
  }
  
  export default connect(mapStateToProps)(ReadBooks);
