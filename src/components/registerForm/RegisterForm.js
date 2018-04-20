import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { registerUser } from '../../actions/register';
import Button from '../button'

import './RegisterForm.css';

class RegisterForm extends Component {

  
		state = {
			name: '',
			username: '',
			password: '',
		}

		handleInputChange = (e) => {
			const { name, value } = e.target;
	
			if (name) {
				this.setState({ [name]: value });
			}
		}
	
		handleSubmit = async (e) => {
			e.preventDefault();
	
			const { dispatch } = this.props;
			const { name, username, password } = this.state;
			
			dispatch(registerUser(name, username, password));
		}

	render() {
		const { name, username, password } = this.state;
		const { isFetching, message } = this.props;

		if (isFetching) {
			return(
				<div>
					<Helmet defaultTitle="Skrái notanda..."/>
					<p>Bökum nýjan notanda: <em>{username}</em>...</p>
				</div>
			);
		}

		return (
			<div>
				<h1>Nýskráning</h1>
				{message && (
					<ul>{message.map((error, i) => (
						<ul key={i}>
							<dt>{error.field}</dt>
							<dd>{error.message}</dd>
						</ul>
						))}
					</ul>
				)}
				<div className="form">
					<form onSubmit={this.handleSubmit}>
						<div className="form form--container">
							<label htmlFor="name">Nafn</label>
							<input className="form__input" id="name" type="text" name="name" value={name} onChange={this.handleInputChange} />
						</div>

						<div className="form form--container">
							<label htmlFor="username">Notendanafn:</label>
							<input className="form__input" id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
						</div>

						<div className="form form--container">
							<label htmlFor="password">Lykilorð:</label>
							<input className="form__input" id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
						</div>

						<Button disabled={isFetching}>Búa til notanda</Button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		// er ekki að nota isFetching atm
    isFetching: state.register.isFetching,
    message: state.register.message,
  }
}

export default connect(mapStateToProps)(RegisterForm);