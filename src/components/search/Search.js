import React, { Component } from 'react';
import Button from '../button';
import PropTypes from 'prop-types';

import './Search.css';

class Search extends Component {

  state = {
    query: '',
    placeholder: 'Bókaleit'
  }

  static contextTypes = {
    router: PropTypes.object
}

  handleSubmit = async (e) => {
    e.preventDefault();
    const { query } = this.state;
    const cleanQuery = query.trim();
    this.setState({ query: '' });
    this.context.router.history.push(`/books?query=${cleanQuery}&page=1`);
  }

  handleInputChange = (e) => {
    const { name, value} = e.target;
    if (name) {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <div className="headerForm">
        <form onSubmit={this.handleSubmit}>
          <input  className="searchInput" value={this.state.query} type="search" name="query" placeholder="Bókaleit" onChange={this.handleInputChange}></input>
          <Button className="leitarButton">Leita</Button>
        </form>
      </div>
    );
  }
}



export default Search;