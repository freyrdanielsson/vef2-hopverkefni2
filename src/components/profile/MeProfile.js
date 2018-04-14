import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { registerUser } from '../../actions/register';

import './MeProfile.css';

class MeProfile extends Component {


	render() {


		
		// hér vill ég bara rendera 3 form og svo töflu af lesnum bókum
		// hver component ætti að birta sýna eigin villu
		return (
			'yo'
		);
	}
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.register.isFetching,
    message: state.register.message,
  }
}

export default connect(mapStateToProps)(MeProfile);