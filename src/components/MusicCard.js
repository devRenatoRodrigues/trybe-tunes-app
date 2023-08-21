import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import emptyHeart from '../assets/empty_heart.png';
import redHeart from '../assets/red_heart.png';
import '../styles/MusicCard.css';

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
    const isMusicFavorite = favoriteSongs
      .some(({ trackName }) => trackName === musicName);
    this.setState({ isChecked: isMusicFavorite });
  };

  toggleFavoriteSong = async () => {
    const { music } = this.props;
    const { isChecked } = this.state;
    if (isChecked) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    this.setState((prevState) => ({ isChecked: !prevState.isChecked }));
  };

  render() {
    const {
      musicName,
      musicPreview,
      trackId,
      onClick,
    } = this.props;

    const { isChecked } = this.state;
    return (
      <div>
        <div>
          <p className="white-color">{musicName}</p>
          <audio data-testid="audio-component" src={ musicPreview } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor="Favorita" className="favorite-label">
            <input
              id="Favorita"
              name="Favorita"
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.toggleFavoriteSong }
              checked={ isChecked }
              onClick={ onClick }
            />
            <img
              src={ isChecked ? redHeart : emptyHeart }
              alt={ isChecked
                ? 'Ícone de Favorita Marcada'
                : 'Ícone de Favorita Não Marcada' }
              className="favorite-icon"
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
