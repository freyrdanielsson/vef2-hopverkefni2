import React, { Component } from 'react';

import MeUrl from '../../components/meUrl';
import MeName from '../../components/meName';

export default class Profile extends Component {

  render() {
    return (
      <div>
        <h1>Upplýsingar</h1>
        <MeUrl/>
        <MeName/>
        
      </div>
    );
  }
}
