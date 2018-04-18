import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import { Link } from 'react-router-dom'
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
        language: this.props.books.language
    } 

    static contextTypes = {
        router: PropTypes.object
    }

	handleSubmit = async (e) => {
        e.preventDefault();
        const { dispatch, id, isFetching } = this.props;

        dispatch(patchBook(this.state, id));
    }
    
    handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name) {
			this.setState({ [name]: value });
		}

    }

    render() {
        const { books, id, book, isFetching, message } = this.props;

		if (isFetching) {
			return (
			<div>
				<p><em>Uppfæri bók...</em></p>
			</div>
			);
        }
        
        if(message) {
            console.log(message[0]);
        }

        if(book){
            return(
                <p>tókst að uppfæra</p>
            );
            //tókst að uppfæra
        }
        const { title, author, description, isbn10, isbn13, published, pagecount, language} = this.state;
        return(
            <div>
                <h1>Breyta bók</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>Titill:</label> 
                        <input type="text" name="title" defaultValue={title} onChange={this.handleInputChange}/>
                        <label>Höfundur:</label> 
                        <input type="text" name="author" defaultValue={author} onChange={this.handleInputChange}/>
                        <label>Lýsing:</label> 
                        <input type="textarea" name="description" defaultValue={description} onChange={this.handleInputChange}/>
                        <label>ISBN10:</label> 
                        <input type="text" name="isbn10" defaultValue={isbn10} onChange={this.handleInputChange}/>
                        <label>ISBN13:</label> 
                        <input type="text" name="isbn13" defaultValue={isbn13} onChange={this.handleInputChange}/>
                        <label>Útgefin:</label> 
                        <input type="text" name="published" defaultValue={published} onChange={this.handleInputChange}/>
                        <label>Fjöldi síða:</label> 
                        <input type="text" name="pagecount" defaultValue={pagecount} onChange={this.handleInputChange}/>
                        <label>Tungumál:</label> 
                        <input type="text" name="language" defaultValue={language} onChange={this.handleInputChange}/>
                        <Button>Vista</Button>
                    </form>
                        <Button onClick={this.context.router.history.goBack}>Til baka</Button>
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