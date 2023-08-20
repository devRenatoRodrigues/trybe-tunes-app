import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Albuns.css';

class Albuns extends Component {
  render() {
    const {
      albumImage,
      albumArtist,
      albumCollection,
      albumID,
    } = this.props;
    return (
      <div className="card border-light mb-3 card-item-albun">
        <img
          className="card-img-top card-album"
          src={ albumImage }
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{albumCollection}</h6>
          <p className="card-text">{albumArtist}</p>
          <Link
            class="btn btn-primary"
            data-testid={ `link-to-album-${albumID}` }
            to={ `/album/${albumID}` }
          >
            More
          </Link>
        </div>
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
