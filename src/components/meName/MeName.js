import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { updateUser } from '../../actions/me';

import Button from '../button';

import './MeName.css';

class MeName extends Component {

	state = {name: '', password: '', secondPassword: ''};

	handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name) {
			this.setState({ [name]: value });
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const type = e.target.className;
		const { dispatch } = this.props;

		const info = { [type]: this.state[type]};
		let theSame = true;
		if(type === 'password') {
			theSame = this.state.password === this.state.secondPassword
		}

		dispatch(updateUser(info, theSame));
	}

	render() {
		const {isFetching, type, label, buttonText, className } = this.props;
		const { theSame } = this.state

		if (isFetching) {
			return (
			<div>
				<Helmet defaultTitle="Uppfæri nafn.."/>
				<p><em>Uppfæri nafn...</em></p>
			</div>
			);
		}

		return (
			<div>
			
				<form className={className} onSubmit={this.handleSubmit}>
					<div>
						{label.map((info, i) => (
						<div key={i}>
							<label htmlFor={info.field}>{`${info.label}: `}</label>
							<input type={type} name={info.field} value={this.state[info.field]} onChange={this.handleInputChange} />
						</div>
						))}
					</div>
					<Button>{buttonText}</Button>

				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		isFetching: state.me.isFetching,
  }
}

export default connect(mapStateToProps)(MeName);