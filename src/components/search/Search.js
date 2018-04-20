import React, { Component } from 'react';

import Button from '../button';

import './Search.css';

class Search extends Component {

  render() {
    return (
      <div className="headerForm">
        <form action={`${window.location.origin}/books?query=&page=`}>
          <input  className="searchInput" type="search" name="query" placeholder="Bókaleit"></input>
          <input type="hidden" name="page" value={1} />
          <Button type="submit" className="leitarButton">Leita</Button>
        </form>
      </div>
    );
  }
}



export default Search;