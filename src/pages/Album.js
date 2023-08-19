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
  };

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsAlbum = await getMusics(id);
    this.setState({
      musics: musicsAlbum,
      albumInfos: musicsAlbum[0],
      isLoading: false,
    });
  };

  ToggleHandleClick = async () => {
    this.setState({ isLoading: true });
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
    } = this.state;

    return (
      isLoading ? (
        <Loading />
      ) : (
        <div data-testid="page-album">
          <Header />
          <div>
            <img src={ artworkUrl100 } alt="Album Cover" />
            <h2 data-testid="album-name">{collectionName}</h2>
            <h3 data-testid="artist-name">{artistName}</h3>
          </div>
          {musics.slice(1).map((music) => (
            <div key={ music.trackName }>
              <MusicCard
                music={ music }
                musicName={ music.trackName }
                musicPreview={ music.previewUrl }
                trackId={ music.trackId }
                onClick={ this.ToggleHandleClick }
              />
            </div>
          ))}

        </div>
      ));
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
