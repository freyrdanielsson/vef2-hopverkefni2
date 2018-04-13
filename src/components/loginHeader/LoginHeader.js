import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { Link } from 'react-router-dom';

import './LoginHeader.css';

class LoginHeader extends Component {

	handleLogout = (e) => {
		const { dispatch } = this.props;
		dispatch(logoutUser());
	}

  render() {
		const { user } = this.props;
				
		if (this.props.user) {
			return (
				<div>
					<button onClick={this.handleLogout}>Útskrá</button>
					<p>{user.username}</p>
				</div>
			);
		}
    
    
    return (
			<Link to="/login">Innskráning</Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(LoginHeader);