import React, { Component } from 'react';
import Albuns from '../components/Albuns';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    disabled: true,
    search: '',
    isLoading: false,
    albuns: [],
    result: false,
  };

  handleChange = (event) => {
    const { value } = event.target;
    const minLength = 2;
    const nameLength = value.length;
    if (nameLength >= minLength) {
      this.setState({
        search: value,
        disabled: false,
      });
    }
  };

  handleClick = async () => {
    const { search } = this.state;
    this.setState({ isLoading: true });
    const getAlbuns = await searchAlbumsAPI(search);
    this.setState({
      isLoading: false,
      albuns: getAlbuns,
      result: true,
    });
  };

  render() {
    const { result, disabled, isLoading, search, albuns } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section>
          {isLoading ? (<Loading />) : (
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
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
          )}
        </section>
        <section>
          <div>
            {result ? (
              <h2>
                Resultado de álbuns de:
                {' '}
                { search }
              </h2>) : (<h2> </h2>)}
          </div>
          {albuns.length === 0
            ? (<h1>Nenhum álbum foi encontrado</h1>) : (albuns.map((album) => (
              <div key={ album.collectionName }>
                <div>
                  <Albuns
                    albumImage={ album.artworkUrl100 }
                    albumCollection={ album.collectionName }
                    albumArtist={ album.artistName }
                    albumID={ album.collectionId }
                  />
                </div>
              </div>)))}

        </section>

      </div>
    );
  }
}

export default Search;
