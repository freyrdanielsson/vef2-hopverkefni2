import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { updateUser } from '../../actions/me';

import Button from '../button';

import './MeName.css';

class MeName extends Component {

	state = {name: ''};

	handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name) {
			this.setState({ [name]: value });
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		const { dispatch } = this.props;
		const { name } = this.state;
		
		dispatch(updateUser({name: name}));
	}

	render() {
		const {isFetching } = this.props;
		const { name } = this.state;

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
			
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="username">Notendanafn:</label>
						<input id="name" type="text" name="name" value={name} onChange={this.handleInputChange} />
					</div>
					<Button>Uppfæra Nafn</Button>
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