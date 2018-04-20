import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { fetch, deleteBook } from '../../actions/users';
import Button from '../button';
import NotFound from '../../routes/not-found';
// import NotFound from '../../routes/not-found';

import './ReadBooks.css';

// Sér til þess að síða refreshi þegar smellt er a back
window.onpopstate = function(event) {
    window.location.reload();
  };

class ReadBooks extends Component {
    state = { page: 1 }

    // skilar -1 ef page er invalid annars page
    getPage(page) {
        return (isNaN(page) || page <= 0) ? -1 : parseInt(page);
    }


    getUrlParams(){
        const urlParams = this.state;

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
        dispatch(fetch('/users/me/read', validUrl, this.props.className));
    }

    handleDelete = async (id) => {
        const page = this.state.page;
        const { dispatch } = this.props;
        const validUrl = `?offset=${(page-1)*10}`;
		dispatch(deleteBook(id, this.props.className, validUrl));
    }
    
    handleChange = async (pageNr) => {
        window.history.pushState(null, '', `/profile?page=${pageNr}`);
        
        const { dispatch } = this.props;
        const validUrl = `?offset=${(pageNr-1)*10}`;
        dispatch(fetch('/users/me/read', validUrl, this.props.className));

        this.setState({page: pageNr});
    }

    render() {
        const { items, isFetching, className } = this.props;
        
        const page = this.state.page;
        const bookCount = items ? items.length : 0;

        if (isFetching === className) {
			return (
			<div>
				<p><em>Hleð bækur...</em></p>
			</div>
			);
        }
        
        if(page === 1 && bookCount <= 0){
            return (
                <div>
                    <h2 className="read read--header">Lesnar bækur</h2>
                    <p>Engar lesnar bækur</p>
                </div>     
            )
        }

        if(page > 1 && bookCount <= 0){
            return (
                <div>
                    <h2 className="read read--header">Lesnar bækur</h2>
                    <p>Ekki fleiri bækur</p>
                    <Button onClick={() => this.handleChange(1)}>Fyrsta síða</Button>
                </div>     
            )
        }

        

        
        return (
            <section className="read">
                <h2 className="read read--header">Lesnar bækur</h2>
                <ul className="read read--list">
                    {items && (
                        items.map((book) => {
                    return (
                    <li className="read read--item" key={book.id}>
                            <Link to={`/books/${book.book_id}`}>{book.title}</Link>
                            <div>
                                <p>{book.rating && (`Einkun: ${book.rating}`)}</p>
                            </div>
                            <div>
                                <p>{book.review && (`Um bók: ${book.review}`)}</p>
                            </div>
                            <Button className="delete" onClick={() => this.handleDelete(book.id, page)}>Eyða</Button>
                            <div className="list_seperator"></div>
                    </li>
                    )
                    }))}
                </ul>
                {bookCount > 0 && (
                <div className="buttonLayout">
                    {page > 1 && <Button onClick={() => this.handleChange(page - 1)} className="pageButton">Fyrri Síða</Button>}
                    <div className="pageHolder">
                        <p className="page">{`Síða ${page}`}</p>
                    </div>
                    {bookCount >= 10 && <Button onClick={() => this.handleChange(page + 1)} className="pageButton">Næsta Síða</Button>}
                </div>
                )}
            </section>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isFetching: state.users.isFetching,
        items: state.users.items,
    }
  }
  
  export default connect(mapStateToProps)(ReadBooks);
