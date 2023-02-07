import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Albuns extends Component {
  render() {
    const {
      albumImage,
      albumArtist,
      albumCollection,
      albumID,
    } = this.props;
    return (
      <div>
        <img src={ albumImage } alt="" />
        <h4>{albumCollection}</h4>
        <p>{albumArtist}</p>
        <Link
          data-testid={ `link-to-album-${albumID}` }
          to={ `/album/${albumID}` }
        >
          More
        </Link>
      </div>
    );
  }
}

Albuns.propTypes = {
  albumImage: PropTypes.string,
  albumCollection: PropTypes.string,
  albumArtist: PropTypes.string,
  albumID: PropTypes.number,
}.isRequired;

export default Albuns;
