import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { updateUser } from '../../actions/users';

import Button from '../button';

import './MeForm.css';

class MeForm extends Component {

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

		dispatch(updateUser(info, theSame, this.props.className));
	}

	render() {
		const {isFetching, type, label, buttonText, className } = this.props;

		if (isFetching === className) {
			return (
			<div>
				<Helmet defaultTitle="Uppfæri nafn.."/>
				<p><em>Uppfæri nafn...</em></p>
			</div>
			);
		}

		return (
			<div className="form">
			
				<form className={className} onSubmit={this.handleSubmit}>
					{label.map((info, i) => (
					<div className="form form--container" key={i}>
						<label htmlFor={info.field}>{`${info.label}: `}</label>
						<input className={`form__input ${className}`} type={type} name={info.field} value={this.state[info.field]} onChange={this.handleInputChange} />
					</div>
					))}
					<Button>{buttonText}</Button>

				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		isFetching: state.users.isFetching,
  }
}

export default connect(mapStateToProps)(MeForm);