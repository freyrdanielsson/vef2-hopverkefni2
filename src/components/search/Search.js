import React, { Component } from 'react';

import Button from '../button';

class Search extends Component {

  onClick = (e) => {
    console.log('leita');
  }

  render() {
    return (
        <Button onClick={this.onClick}>Leita</Button>
    );
  }
}



export default Search;