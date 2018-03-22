import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {

    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */

    return (
      <div>
        <p>Halló heimur!</p>
        <p><Link to="/login">Innskráning</Link></p>
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;
