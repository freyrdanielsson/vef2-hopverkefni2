import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  render() {

    const { authenticated } = this.props;

    return (
      <section>
      <h1>Velkomin á bókasafnið</h1>
      <div>
        {authenticated 
        ? <p>Þú ert skráður notandi og getur því
          <Link to="/books/new"> skráð bækur</Link>. {/* VANTAR VIRKNI OG BREYTA LINK */}
          og breytt
          <Link to="/books"> þeim sem til eru</Link>.
          einnig getur þú
          <Link to="/users"> skoðað aðra notendur</Link>.
        </p>
        : <p>Til að njóta bókasafnsins til fullnustu mælum við með að
          <Link to="/login"> skrá sig inn</Link>.
          Þangað til getur þú skoðað
          <Link to="/books"> allar bækur</Link>.
          </p>}
      </div>
      </section>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;
