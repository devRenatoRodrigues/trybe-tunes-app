import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: [],
    albumInfos: [],
    isLoading: true,
    currentPage: 1,
  };

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsAlbum = await getMusics(id);
    const restOfMusics = musicsAlbum.slice(1);
    this.setState({
      musics: restOfMusics,
      albumInfos: musicsAlbum[0],
      isLoading: false,
    });
  };

  ToggleHandleClick = async () => {
    this.setState({ isLoading: true });

    const { musics } = this.state;
    const musicArray = musics.map((music) => music);
    await getFavoriteSongs();
    this.setState({
      musics: musicArray,
      isLoading: false,
    });
  };

  render() {
    const {
      musics,
      albumInfos: { artworkUrl100, collectionName, artistName },
      isLoading,
      currentPage,
    } = this.state;

    console.log(musics);
    const musicsPerPage = 4;
    const startIndex = (currentPage - 1) * musicsPerPage;
    const endIndex = startIndex + musicsPerPage;
    const currentMusics = musics.slice(startIndex, endIndex);

    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <div id="container">
            <div className="album-card">
              <img src={ artworkUrl100 } alt="Album Cover" />
              <h5
                data-testid="album-name"
                className="white-color"
              >
                {collectionName}

              </h5>
              <h6
                data-testid="artist-name"
                className="white-color"
              >
                {artistName}

              </h6>
            </div>
            <div id="music-container">
              <ul className="music-card-container">
                { currentMusics.map((music) => (
                  <li
                    className="music-card"
                    key={ music.trackId }
                  >
                    <MusicCard
                      music={ music }
                      musicName={ music.trackName }
                      musicPreview={ music.previewUrl }
                      trackId={ music.trackId }
                      onClick={ this.ToggleHandleClick }
                    />
                  </li>
                ))}
              </ul>
              <ul className="pagination" id="button-previous-next">
                <li className={ `page-item ${currentPage === 1 ? 'disabled' : ''}` }>
                  <a
                    href="#!"
                    onClick={
                      () => this.setState({ currentPage: currentPage - 1 })
                    }
                    className="page-link"
                  >
                    Previous
                  </a>
                </li>
                <li
                  className={ `page-item ${
                    currentPage === Math
                      .ceil(musics.length / musicsPerPage) ? 'disabled' : ''
                  }` }
                >
                  <a
                    href="#!"
                    onClick={
                      () => this.setState({ currentPage: currentPage + 1 })
                    }
                    className="page-link"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// o slice faz com que o map inicie a partir do index `1` do array

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
