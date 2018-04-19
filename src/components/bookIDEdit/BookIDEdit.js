import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import { Link } from 'react-router-dom';
import { patchBook } from '../../actions/patchBook';
import { connect } from 'react-redux';


import './BookIDEdit.css';

class BookIDEdit extends Component {

    state = {
        title: this.props.books.title,
        author: this.props.books.author,
        description: this.props.books.description,
        isbn10: this.props.books.isbn10,
        isbn13: this.props.books.isbn13,
        published: this.props.books.published,
        pagecount: this.props.books.pagecount,
        language: this.props.books.language,
        initial: true,
        errors: {}
    } 

    static contextTypes = {
        router: PropTypes.object
    }

	handleSubmit = async (e) => {
        e.preventDefault();
        const { dispatch, id, isFetching } = this.props;
        this.setState({ errors: {}, initial: false });
        dispatch(patchBook(this.state, id));
    }
    
    handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name) {
			this.setState({ [name]: value });
		}
    }

    handleChange = async () => {
        const { id } = this.props;
        this.context.router.history.push(`/books/${id}`);
    }


    render() {
        const { book, isFetching, message, id } = this.props;
        const { title, author, description, isbn10, isbn13, published, pagecount, language, errors, initial} = this.state;

		if (isFetching) {
			return (
			<div>
				<p><em>Uppfæri bók...</em></p>
			</div>
			);
        }

        if(message){
            message.map( msg =>{
                errors[msg.field] = 'Error';
            });
        }

        if(book && !initial){
            const newTo = { 
                pathname:`/books/${id}`, 
                updated: true
            };
            return(
                <div>
                    <p>Bók breytt</p>
                    <Link to={newTo}>Skoða bók</Link>
                </div>
            );
        }

        return(
            <div>
                <h1>Breyta bók</h1>
                <ul>
                    {message && message.map( msg =>
                        <li key={msg.field}>{msg.message}</li>
                    )}
                </ul>
                    
 
                <form onSubmit={this.handleSubmit}>
                            <label className={`label${errors.title}`}>Titill:</label> 
                            <input className={`input${errors.title}`} type="text" name="title" defaultValue={title} onChange={this.handleInputChange}/>
                            <label className={`label${errors.author}`}>Höfundur:</label> 
                            <input className={`input${errors.author}`} type="text" name="author" defaultValue={author} onChange={this.handleInputChange}/>
                            <label className={`label${errors.description}`}>Lýsing:</label> 
                            <textarea className={`input${errors.description}`} type="textarea" name="description" defaultValue={description} onChange={this.handleInputChange}/>
                            <label className={`label${errors.isbn10}`}>ISBN10:</label> 
                            <input className={`input${errors.isbn10}`} type="text" name="isbn10" defaultValue={isbn10} onChange={this.handleInputChange}/>
                            <label className={`label${errors.isbn13}`}>ISBN13:</label> 
                            <input className={`input${errors.isbn13}`} type="text" name="isbn13" defaultValue={isbn13} onChange={this.handleInputChange}/>
                            <label className={`label${errors.published}`}>Útgefin:</label> 
                            <input className={`input${errors.published}`} type="text" name="published" defaultValue={published} onChange={this.handleInputChange}/>
                            <label className={`label${errors.pagecount}`}>Fjöldi síða:</label> 
                            <input className={`input${errors.pagecount}`} type="text" name="pagecount" defaultValue={pagecount} onChange={this.handleInputChange}/>
                            <label className={`label${errors.language}`}>Tungumál:</label> 
                            <input className={`input${errors.language}`} type="text" name="language" defaultValue={language} onChange={this.handleInputChange}/>
                        <Button>Vista</Button>

                </form>
                        <Button onClick={this.handleChange}>Til baka</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
          isFetching: state.patchBook.isFetching,
          book: state.patchBook.book,
          message: state.patchBook.message
    }
  }
  
  export default connect(mapStateToProps)(BookIDEdit);