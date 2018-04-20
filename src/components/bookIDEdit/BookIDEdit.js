import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import { Link, Redirect } from 'react-router-dom';
import { patchBook } from '../../actions/patchBook';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';


import './BookIDEdit.css';

class BookIDEdit extends Component {

    state = {
        title: this.props.books.title,
        author: this.props.books.author,
        description: this.props.books.description,
        isbn10: this.props.books.isbn10,
        isbn13: this.props.books.isbn13,
        published: this.props.books.published,
        pageCount: this.props.books.pagecount,
        language: this.props.books.language,
        category: this.props.books.category,
        categories: this.props.categories,
        initial: true,
        errors: {}
    } 

    static contextTypes = {
        router: PropTypes.object
    }

	handleSubmit = async (e) => {
        e.preventDefault();
        const { dispatch, id } = this.props;
        this.setState({ errors: {}, initial: false });
        const patched = (({ title, author, category, description, isbn10, isbn13, published, pageCount, language }) => (
            { title, author, category, description, isbn10, isbn13, published, pageCount, language }))(this.state);
        dispatch(patchBook(patched, id));
    }
    
    handleInputChange = (e) => {
        const { name, value} = e.target;
		if (name) {
			this.setState({ [name]: value });
		}
    }

    handleChange = async () => {
        const { id } = this.props;
        this.context.router.history.push(`/books/${id}`);
    }


    render() {
        const { book, isPatching, message, id } = this.props;
        const { title, author, description, isbn10, isbn13, published,
                pageCount, category, language, errors, initial, categories} = this.state;
		if (isPatching) {
			return (
			<div className="textView">
				<p><em>Uppfæri bók...</em></p>
			</div>
			);
        }

        if(!initial && message && message.status >= 400){
            if(message.status === 401){
                return(<Redirect to={`/login`} />)
            }
            if(message.result.error){
                return(
                    <div className="textView">
                        <p><em>Tókst ekki að uppfæra bók</em></p>
                    </div>
                );
            }
            const err = initial ? '' : 'Error';
            message.result.errors.map( msg => {
                return errors[msg.field] = err;
            });
        }

        if(book && !initial && !message){
            // Skitamix því vefþjónustan skilar ekki 'categorytitle', bætum því við í book (responsið)
            categories.map((cat) => {
               if(cat.id === book.category) book.categorytitle = cat.title;
               return book.categorytitle;
            })
            const newTo = { 
                pathname:`/books/${id}`, 
                book: book
            };
            return(
                <div>
                    <p>Bók breytt</p>
                    <Link to={newTo}>Skoða bók</Link>
                </div>
            );
        }
        return(
            <div className="bookEditPage">
                <Helmet title="Breyta bók" />
                <h1>Breyta bók</h1>
                <ul>
                    {!initial && message && message.result.errors && message.result.errors.map( msg =>
                        <li key={msg.field}>{msg.message}</li>
                    )}
                </ul>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form form--container">
                            <label className={`label${errors.title}`}>Titill:</label> 
                            <input className={`form__input ${errors.title}`} type="text" name="title" defaultValue={title} onChange={this.handleInputChange}/>
                        </div>
                        <div className="form form--container">
                            <label className={`label${errors.author}`}>Höfundur:</label> 
                            <input className={`form__input ${errors.author}`} type="text" name="author" defaultValue={author} onChange={this.handleInputChange}/>
                        </div>
                        <div className="form form--container area">
                            <label className={`label${errors.description}`}>Lýsing:</label> 
                            <textarea className={`form__input ${errors.description} area`} type="textarea" name="description" defaultValue={description} onChange={this.handleInputChange}/>
                        </div>
                        <div className="form form--container area">
                            <label>Flokkur:</label>
                            <select name="category" defaultValue={category} onChange={this.handleInputChange}>
                                {categories.map( (cat) =>
                                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                                )}
                            </select>
                        </div>
                        <div className="form form--container">
                            <label className={`label${errors.isbn10}`}>ISBN10:</label> 
                            <input className={`form__input ${errors.isbn10}`} type="text" name="isbn10" defaultValue={isbn10} onChange={this.handleInputChange}/>
                        </div>
                        <div className="form form--container">
                            <label className={`label${errors.isbn13}`}>ISBN13:</label> 
                            <input className={`form__input ${errors.isbn13}`} type="text" name="isbn13" defaultValue={isbn13} onChange={this.handleInputChange}/>
                        </div>
                        <div className="form form--container">
                            <label className={`label${errors.published}`}>Útgefin:</label> 
                            <input className={`form__input ${errors.published}`} type="text" name="published" defaultValue={published} onChange={this.handleInputChange}/>
                        </div>
                        <div className="form form--container">   
                            <label className={`label${errors.pagecount}`}>Fjöldi síða:</label> 
                            <input className={`form__input ${errors.pagecount}`} type="text" name="pageCount" defaultValue={pageCount} onChange={this.handleInputChange}/>
                        </div>
                        <div className="form form--container">
                            <label className={`label${errors.language}`}>Tungumál:</label> 
                            <input className={`form__input ${errors.language}`} type="text" name="language" defaultValue={language} onChange={this.handleInputChange}/>
                        </div>
                        <Button>Vista</Button>
                    </form>
                </div>
                    <Button className="back" onClick={this.handleChange}>Til baka</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
          isPatching: state.patchBook.isPatching,
          book: state.patchBook.book,
          message: state.patchBook.message,
    }
  }
  
  export default connect(mapStateToProps)(BookIDEdit);