import React, { Component } from 'react';
import Helmet from 'react-helmet';

import MeUrl from '../../components/meUrl';
import MeForm from '../../components/meForm';
import ReadBooks from '../../components/readBooks';

export default class Profile extends Component {
  static defaultProps = { 
    name: [{label: 'Nafn', field: 'name'}],
    password: [{label: 'Lykilorð', field: 'password'}, {label: 'Lykilorð, aftur', field: 'secondPassword'}]
  }

  render() {

    return (
      <div>
        <Helmet title="Mín síða"/>
        <h1>Upplýsingar</h1>
        <MeUrl className='profile'/>
        <MeForm className='name' type="text" label={this.props.name} buttonText="Uppfæra nafn"/>
        <MeForm className='password' type="password" label={this.props.password} buttonText="Uppfæra lykilorð"/>
        <ReadBooks className='books'/>
      </div>
    );
  }
}
