import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Button from '../button';

import { loginUser } from '../../actions/auth';

import './LoginForm.css';

class LoginForm extends Component {

  
		state = {
			username: '',
			password: '',
		}

		handleInputChange = (e) => {
			const { name, value } = e.target;
			
			// name er heiti dálks, value er gildi
	
			if (name) {
				this.setState({ [name]: value });
			}
		}
	
		handleSubmit = async (e) => {
			e.preventDefault();
	
			const { dispatch } = this.props;
			const { username, password } = this.state;
			
			dispatch(loginUser(username, password));
		}

	render() {
		const { username, password } = this.state;
		const { isFetching, message } = this.props;

		if (isFetching) {
			return (
			<div>
				<Helmet defaultTitle="Skrái inn.."/>
				<p>Skrái inn <em>{username}</em>...</p>
			</div>
			);
		}

		return (
			<div>
			<h1>Innskráning</h1>

				{message && (
					<p>{message}</p>
				)}
				<div className="form">
					<form method="POST" onSubmit={this.handleSubmit}>

						<div className="form form--container">
							<label htmlFor="username">Notendanafn:</label>
							<input className="form__input" id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
						</div>

						<div className="form form--container">
							<label htmlFor="password">Lykilorð:</label>
							<input className="form__input" id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
						</div>

						<Button disabled={isFetching}>Innskrá</Button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    message: state.auth.message,
  }
}

export default connect(mapStateToProps)(LoginForm);