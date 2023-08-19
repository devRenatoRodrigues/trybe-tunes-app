import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    musics: [],
    isLoading: true,
  };

  componentDidMount() {
    this.MusicDataRecovery();
  }

  MusicDataRecovery = async () => {
    this.setState({ isLoading: true });
    const musicsArray = await getFavoriteSongs();
    this.setState({
      musics: musicsArray,
      isLoading: false,
    });
  };

  ToggleHandleClick = async (musicClicked) => {
    this.setState({ isLoading: true });
    const { musics } = this.state;
    const musicArray = musics
      .filter((music) => music.trackName !== musicClicked.trackName);
    await getFavoriteSongs();
    this.setState({
      musics: musicArray,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, musics } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading
            ? (<Loading />)
            : (
              <div>
                {musics.map((music) => (
                  <div key={ music.trackName }>
                    <MusicCard
                      music={ music }
                      musicName={ music.trackName }
                      musicPreview={ music.previewUrl }
                      trackId={ music.trackId }
                      onClick={ () => this.ToggleHandleClick(music) }
                    />
                  </div>
                ))}
              </div>)
        }
      </div>
    );
  }
}

Favorites.propTypes = {
  musicName: PropTypes.object,
  musicPreview: PropTypes.object,
  trackId: PropTypes.string,
  music: PropTypes.object,
}.isRequired;

export default Favorites;
