import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import { Link, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { post } from '../../actions/post';
import { fetchCategories } from '../../actions/categories';



import './NewBook.css';

class NewBook extends Component {

    state = {
        title: '',
        author: '',
        description: '',
        isbn10: '',
        isbn13: '',
        published: '',
        pageCount: '',
        language: '',
        category: 0,
        errors: {}
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCategories());
    }

	handleSubmit = async (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(post('/books', this.state));
    }
    
    handleInputChange = (e) => {
        const { name, value } = e.target;
		this.setState({ [name]: value });
    }

    handleBack = async () => {
        window.history.back();
    }

    render() {
        const { result, isFetching, message, categories } = this.props;
        const { title, author, description, isbn10, isbn13, published, pageCount, language, errors, category} = this.state;

		if(isFetching) {
			return (
			<div>
				<p><em>Bæti við...</em></p>
			</div>
			);
        }

        if(message){
            message.map( msg =>{
                errors[msg.field] = 'Error';
            });
        }

        if(result) {
            return(<Redirect to={`${result.id}`} />)
        }

        return(
            <div>
                <Helmet title="Ný bók"/>
                <h1>Ný bók</h1>
                <ul>
                    {message && message.map( msg =>
                        <li key={msg.field}>{msg.message}</li>
                    )}
                </ul>
                    
                <form onSubmit={this.handleSubmit}>
                <div>
                    <label className={`label${errors.title}`}>Titill:</label> 
                    <input className={`input${errors.title}`} type="text" name="title" value={title} onChange={this.handleInputChange}/>
                </div>
                <div>
                    <label className={`label${errors.author}`}>Höfundur:</label> 
                    <input className={`input${errors.author}`} type="text" name="author" value={author} onChange={this.handleInputChange}/>
                </div>
                <div>
                    <label className={`label${errors.description}`}>Lýsing:</label> 
                    <textarea className={`input${errors.description}`} type="textarea" name="description" value={description} onChange={this.handleInputChange}/>
                </div>
                <div>
                    <select name="category" value="test" onChange={this.handleInputChange}>
                    <option value={0}>Veldu flokk:</option>
                        {categories.items && categories.items.map( (cat) =>
                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                        )}
                    </select>
                </div>
                <div>
                    <label className={`label${errors.isbn10}`}>ISBN10:</label> 
                    <input className={`input${errors.isbn10}`} type="text" name="isbn10" value={isbn10} onChange={this.handleInputChange}/>
                </div>
                <div>
                    <label className={`label${errors.isbn13}`}>ISBN13:</label> 
                    <input className={`input${errors.isbn13}`} type="text" name="isbn13" value={isbn13} onChange={this.handleInputChange}/>
                </div>
                <div>
                    <label className={`label${errors.published}`}>Útgefin:</label> 
                    <input className={`input${errors.published}`} type="text" name="published" value={published} onChange={this.handleInputChange}/>
                </div>
                <div>
                    <label className={`label${errors.pagecount}`}>Fjöldi síða:</label> 
                    <input className={`input${errors.pagecount}`} type="text" name="pageCount" value={pageCount} onChange={this.handleInputChange}/>
                </div>
                <div>
                    <label className={`label${errors.language}`}>Tungumál:</label> 
                    <input className={`input${errors.language}`} type="text" name="language" value={language} onChange={this.handleInputChange}/>
                </div>
                    <Button>Bæta við</Button>
                </form>
                    <Button onClick={this.handleBack}>Til baka</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
          isFetching: state.post.isFetching,
          result: state.post.result,
          message: state.post.message,
          categories: state.categories.categories,
    }
  }
  
  export default connect(mapStateToProps)(NewBook);