import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    disabled: true,
  };

  handleChange = (event) => {
    const { value } = event.target;
    const minLength = 2;
    const nameLength = value.length;
    if (nameLength >= minLength) {
      this.setState({
        disabled: false,
      });
    }
  };

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchArtist">
            Search for artist or band:
            <input
              data-testid="search-artist-input"
              name="searchArtist"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            disabled={ disabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
