import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  componentDidMount() {
    this.FavoriteSongsRecovery();
  }

  FavoriteSongsRecovery = async () => {
    const { musicName } = this.props;
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach(({ trackName }) => {
      if (trackName === musicName) {
        return this.setState({ isChecked: true });
      }
    });
    this.setState({ isLoading: false });
  };

  favoriteSong = async () => {
    const { music } = this.props;
    this.setState({ isLoading: true });
    await addSong(music);
    this.setState({
      isLoading: false,
      isChecked: true,
    });
  };

  render() {
    const {
      musicName,
      musicPreview,
      trackId,
    } = this.props;

    const { isLoading, isChecked } = this.state;
    return (
      <div>
        {isLoading ? (<Loading />)
          : (
            <div>
              <p>{musicName}</p>
              <audio data-testid="audio-component" src={ musicPreview } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor="favorite">
                Favorite
                <input
                  name="favorite"
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.favoriteSong }
                  checked={ isChecked }
                />

              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.object,
  musicPreview: PropTypes.object,
  trackId: PropTypes.string,
  music: PropTypes.object,
}.isRequired;

export default MusicCard;
