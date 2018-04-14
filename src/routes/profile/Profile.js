import React, { Component } from 'react';

import MeUrl from '../../components/meUrl';
import MeName from '../../components/meName';

export default class Profile extends Component {
  static defaultProps = { 
    name: [{label: 'Nafn', field: 'name'}],
    password: [{label: 'Lykilorð', field: 'password'}, {label: 'Lykilorð, aftur', field: 'secondPassword'}]
  }

  render() {

    return (
      <div>
        <h1>Upplýsingar</h1>
        <MeUrl/>
        <MeName className='name' type="text" label={this.props.name} buttonText="Uppfæra nafn"/>
        <MeName className='password' type="password" label={this.props.password} buttonText="Uppfæra lykilorð"/>
      </div>
    );
  }
}
