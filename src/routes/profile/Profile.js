import React, { Component } from 'react';

import MeUrl from '../../components/meUrl';
import MeForm from '../../components/meForm';

export default class Profile extends Component {
  static defaultProps = { 
    name: [{label: 'Nafn', field: 'name'}],
    password: [{label: 'Lykilorð', field: 'password'}, {label: 'Lykilorð, aftur', field: 'secondPassword'}]
  }

  render() {

    return (
      <div>
        <h1>Upplýsingar</h1>
        <MeUrl className='profile'/>
        <MeForm className='name' type="text" label={this.props.name} buttonText="Uppfæra nafn"/>
        <MeForm className='password' type="password" label={this.props.password} buttonText="Uppfæra lykilorð"/>
      </div>
    );
  }
}
