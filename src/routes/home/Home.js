import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';


class Home extends Component {

  render() {

    const { authenticated } = this.props;

    return (
      <section className="home">
      <h1 className="welcome">Velkomin á bókasafnið</h1>
      <div>
        {authenticated 
        ? <div><p>Þú ert skráður notandi og getur því &nbsp;
          <Link to="/books/new">skráð bækur</Link> &nbsp;
          og breytt &nbsp;
          <Link to="/books">þeim sem til eru</Link>.&nbsp;
          </p><p> Einnig getur þú &nbsp;
          <Link to="/users">skoðað aðra notendur</Link>.&nbsp;
        </p></div>
        : <p>Til að njóta bókasafnsins til fullnustu mælum við með að &nbsp;
          <Link to="/login">skrá sig inn</Link>. &nbsp;
          Þangað til getur þú skoðað &nbsp;
          <Link to="/books">allar bækur</Link>.
          </p>}
      </div>
      </section>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;
