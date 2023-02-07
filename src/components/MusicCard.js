import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const {
      musicName,
      musicPreview,
    } = this.props;
    return (
      <div>
        <p>{musicName}</p>
        <audio data-testid="audio-component" src={ musicPreview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.object,
  musicPreview: PropTypes.object,
}.isRequired;

export default MusicCard;
