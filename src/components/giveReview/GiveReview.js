import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import { registerReadBook } from '../../actions/readBook';
import { connect } from 'react-redux';

import './GiveReview.css';

class GiveReview extends Component {

    state = {
        visible: false,
        review: '',
        grade: 1,
    }

    
    static propTypes = {
        id: PropTypes.string,
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { dispatch, id } =this.props;
        const { review, grade } = this.state;
        dispatch(registerReadBook( id, review, grade));
    }

    handleInputChange = (e) => {
        const { name, value} = e.target;
		if (name) {
            const newValue = name === 'grade' ? parseInt(value) : value;
			this.setState({ [name]: newValue });
		}
    }

    handleChange = async () => {
        const { visible } = this.state;
        const setVisible = visible ? false : true;
        this.setState({ visible: setVisible});
    }

    render(){
        const { visible } = this.state;
        const { isFetching, readBook, message } = this.props;

        if(!visible && !readBook.status){
            return (
                <Button onClick={this.handleChange}>Lesin bók</Button>
            );
        }

        if(isFetching){
            return (
                <p>Skrái lestur...</p>
            );
        }

        if(message || readBook.status >= 400){
            return(
                <p>Tókst ekki að skrá lestur</p>
            );
        }

        if(readBook && readBook.status === 201){
            return(
                <p>Lestur skráður</p>
            );
        }

        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>Um bók:</label>
                <textarea type="textarea" name="review" onChange={this.handleInputChange}/>
                <select name="grade" defaultValue={1} onChange={this.handleInputChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <Button>Vista</Button>
            </form>
            <Button className="haettaVid" onClick={this.handleChange}>Hætta við</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      isFetching: state.readBook.isFetching,
      readBook: state.readBook.readBook,
      message: state.readBook.message
    }
  }
  
  export default connect(mapStateToProps)(GiveReview);