import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { registerUser } from '../../actions/register';

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
			<div>
			<Helmet defaultTitle="Skrái notanda..."/>
			<p>Bökum nýjan notanda: <em>{username}</em>...</p>
		</div>
		}

		return (
			<div>
				{message && (
					<ul>{message.map((error, i) => (
						<ul key={i}>
							<dt>{error.field}</dt>
							<dd>{error.message}</dd>
						</ul>
						))}
					</ul>
				)}

				<form onSubmit={this.handleSubmit}>

					<div>
						<label htmlFor="name">Nafn</label>
						<input id="name" type="text" name="name" value={name} onChange={this.handleInputChange} />
					</div>

					<div>
						<label htmlFor="username">Notendanafn:</label>
						<input id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
					</div>

					<div>
						<label htmlFor="password">Lykilorð:</label>
						<input id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
					</div>

					<button disabled={isFetching}>Búa til notanda</button>
				</form>
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