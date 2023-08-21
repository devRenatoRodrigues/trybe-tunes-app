import React, { Component } from 'react';
import Albuns from '../components/Albuns';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import notFound from '../assets/albun-not-found.png';
import '../styles/Search.css';

class Search extends Component {
  state = {
    disabled: true,
    search: '',
    isLoading: false,
    albuns: [],
    result: false,
    currentPage: 1,
    albumsPerPage: 4,
    searchPerformed: false,
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
      searchPerformed: true,
    });
  };

  render() {
    const { result,
      disabled,
      isLoading,
      search,
      albuns,
      currentPage,
      albumsPerPage,
      searchPerformed } = this.state;

    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const currentAlbums = albuns.slice(indexOfFirstAlbum, indexOfLastAlbum);

    return (
      <>
        <Header />
        <section
          data-testid="page-search"
          className="search-container"
        >
          {isLoading ? (<Loading />) : (
            <form
              className="input-group mb-3 d-grid gap-2 col-6 mx-auto"
            >
              <label
                htmlFor="searchArtist"
                className="input-group-text input-search"
              >
                Search for artist or band:
                <input
                  data-testid="search-artist-input"
                  className="form-control"
                  name="searchArtist"
                  type="text"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="search-artist-button"
                className="btn btn-primary"
                disabled={ disabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
          )}
        </section>
        <section id="albuns-result">
          <div>
            {result && albuns.length !== 0 ? (
              <h4 className="white-color">
                Resultado de álbuns de:
                {search}
              </h4>
            ) : (
              <h2> </h2>
            )}
          </div>
          <ul className="list-group list-group-horizontal-md pagination card-container">
            { searchPerformed && albuns.length === 0 ? (
              <div id="error-result">
                <img
                  src={ notFound }
                  alt="not found albun"
                />
                <h4 className="white-color">Nenhum álbum foi encontrado</h4>
              </div>
            ) : (
              currentAlbums.map((album) => (
                <li key={ album.collectionName } className="list-container ">
                  <Albuns
                    albumImage={ album.artworkUrl100 }
                    albumCollection={ album.collectionName }
                    albumArtist={ album.artistName }
                    albumID={ album.collectionId }
                  />
                </li>
              ))
            )}
          </ul>
          {searchPerformed && albuns.length !== 0 && (
            <ul className="pagination" id="button-previous-next">
              <li className={ `page-item ${currentPage === 1 ? 'disabled' : ''}` }>
                <a
                  href="#!"
                  onClick={ () => this.setState({ currentPage: currentPage - 1 }) }
                  className="page-link"
                >
                  Previous
                </a>
              </li>
              <li
                className={
                  `page-item ${currentPage === Math.ceil(albuns.length / albumsPerPage)
                    ? 'disabled'
                    : ''}`
                }
              >
                <a
                  href="#!"
                  onClick={ () => this.setState({ currentPage: currentPage + 1 }) }
                  className="page-link"
                >
                  Next
                </a>
              </li>
            </ul>
          )}
        </section>
      </>
    );
  }
}

export default Search;
