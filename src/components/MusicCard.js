import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isChecked: false,
  };

  componentDidMount() {
    this.FavoriteSongsRecovery();
  }

  FavoriteSongsRecovery = async () => {
    const { musicName } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    favoriteSongs.forEach(({ trackName }) => {
      if (trackName === musicName) {
        return this.setState({ isChecked: true });
      }
    });
  };

  favoriteSong = async () => {
    const { music } = this.props;
    await addSong(music);
    this.setState({
      isChecked: true,
    });
  };

  removeFavoriteSong = async () => {
    const { music } = this.props;
    await removeSong(music);
    this.setState({
      isChecked: false,
    });
  };

  render() {
    const {
      musicName,
      musicPreview,
      trackId,
      onClick,
    } = this.props;

    const { isChecked } = this.state;
    const isFavorite = isChecked ? this.removeFavoriteSong : this.favoriteSong;
    return (
      <div>
        <div>
          <p>{musicName}</p>
          <audio data-testid="audio-component" src={ musicPreview } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor="Favorita">
            Favorita
            <input
              id="Favorita"
              name="Favorita"
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ isFavorite }
              checked={ isChecked }
              onClick={ onClick }
            />
          </label>
        </div>
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
