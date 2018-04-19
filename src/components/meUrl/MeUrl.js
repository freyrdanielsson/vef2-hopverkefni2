import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { uploadProfile } from '../../actions/users';

import Button from '../button';

import './MeUrl.css';

class MeUrl extends Component {

	state = { profile: '' };

	handleInputChange = (e) => {
		const state = this.state
		state.profile = e.target.files[0];
		this.setState(state);
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		const { dispatch } = this.props;
		const { profile } = this.state;

		let formData = new FormData();
		formData.append('profile', profile);
	
		dispatch(uploadProfile(formData, this.props.className));
	}

	render() {
		const { isFetching, message, className } = this.props;
		const { profile } = this.state;

		
		

		if (isFetching === className) {
			return (
			<div>
				<Helmet defaultTitle="Skrái inn.."/>
				<p><em>Hleð inn mynd...</em></p>
			</div>
			);
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
			
				<form onSubmit={this.handleSubmit} encType="multipart/form-data">
					<div>
						<input id="profile" type="file" name="profile" onChange={this.handleInputChange}/>
						<Button>Uppfæra mynd</Button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.users.isFetching,
    message: state.users.message,
  }
}

export default connect(mapStateToProps)(MeUrl);