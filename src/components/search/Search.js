import React, { Component } from 'react';

import Button from '../button';

import './Search.css';

class Search extends Component {

  onClick = (e) => {
    console.log('leita');
  }

  render() {
    return (
      <form action={`${window.location.origin}/books?query=&page=`}>
        <input type="search" name="query" placeholder="Bókaleit"></input>
        <input type="hidden" name="page" value={1} />
        <Button className="leitarButton" onClick={this.onClick}>Leita</Button>
      </form>
    );
  }
}



export default Search;