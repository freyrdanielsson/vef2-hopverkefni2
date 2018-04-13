import React, { Component } from 'react';

import Button from '../button';

import './Search.css';

class Search extends Component {

  onClick = (e) => {
    e.preventDefault();
    console.log('leita');
  }

  render() {
    return (
      <form>
        <input type="search" placeholder="Bókaleit"></input>
        <Button className="leitarButton" onClick={this.onClick}>Leita</Button>
      </form>
    );
  }
}



export default Search;