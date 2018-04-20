import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { Link } from 'react-router-dom';

import Button from '../button';

import './LoginHeader.css';

class LoginHeader extends Component {

	handleLogout = (e) => {
		const { dispatch } = this.props;
		dispatch(logoutUser());
	}

  render() {
		const { user } = this.props;

		if(user) {
			const profile = user.image ? user.image : '/profile.jpg';

			return (
				<div className="user">
					<div className="user profile">
						<img className="user profile img" src={profile} alt={user.username}/>
					</div>
					<div className="user info">
						<Link to="/profile">{user.name}</Link>
						<Button onClick={this.handleLogout} className="logout">Útskrá</Button>
					</div>
				</div>
			);
		}
    
    
    return (
			<div className="loginLink">
				<Link to="/login">Innskráning</Link>
			</div>
		);
  }
}

const mapStateToProps = (state) => {
  return {
		user: state.auth.user,
  }
}

export default connect(mapStateToProps)(LoginHeader);