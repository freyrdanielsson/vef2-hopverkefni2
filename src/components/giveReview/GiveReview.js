import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import { registerReadBook } from '../../actions/readBook';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './GiveReview.css';

class GiveReview extends Component {

    state = {
        back: true,
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
        this.setState({ back: false });
        dispatch(registerReadBook( id, review, grade));
    }

    handleInputChange = (e) => {
        const { name, value} = e.target;
		if (name) {
            const newValue = name === 'grade' ? parseInt(value, 10) : value;
			this.setState({ [name]: newValue });
		}
    }

    handleChange = async () => {
        const { isAuthenticated } = this.props;
        if(isAuthenticated){
            const { visible } = this.state;
            const setVisible = visible ? false : true;
            this.setState({ visible: setVisible});
        }
    }   

    componentDidMount(){
        this.setState({ 
            back: true,
            visible: false,
        });
    }

    render(){
        const { visible, back } = this.state;
        const { isFetching, readBook, isAuthenticated } = this.props;

        if(back && !visible){
            return (
                <Button className={`show${isAuthenticated}`} onClick={this.handleChange}>Skrá lestur</Button>
            );
        }

        if(!back && isFetching){
            return (
                <p>Skrái lestur...</p>
            );
        }

        if(!back && readBook.status >= 400){
            if(readBook.status === 401){
                return(<Redirect to={`/login`} />)
            }

            return(
                <p>Tókst ekki að skrá lestur</p>
            );
        }

        if(!back && readBook.status === 201){
            return(
                <p>Lestur skráður</p>
            );
        }

        return(
            <div className="reviewComponent">
                <form className="reviewForm" onSubmit={this.handleSubmit}>
                    <label>Um bók:</label>
                    <textarea className="reviewArea" type="textarea" name="review" onChange={this.handleInputChange}/>
                    <label>Einkunn:</label>
                    <select className="einkunnBox" name="grade" defaultValue={1} onChange={this.handleInputChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </form>
                <div className="reviewButtons">
                    <Button onClick={this.handleSubmit}>Vista</Button>
                    <Button className="haettaVid" onClick={this.handleChange}>Hætta við</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      isFetching: state.readBook.isFetching,
      readBook: state.readBook.readBook,
      isAuthenticated: state.auth.isAuthenticated
    }
  }
  
  export default connect(mapStateToProps)(GiveReview);