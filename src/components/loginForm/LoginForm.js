import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

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
		console.log(this.props);
		

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
				{message && (
					<p>{message}</p>
				)}

				<form onSubmit={this.handleSubmit}>

					<div>
						<label htmlFor="username">Notendanafn:</label>
						<input id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
					</div>

					<div>
						<label htmlFor="password">Lykilorð:</label>
						<input id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
					</div>

					<button disabled={isFetching}>Innskrá</button>
				</form>
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