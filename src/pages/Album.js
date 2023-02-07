import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    musics: [],
    albumInfos: [],
    isLoading: true,
  };

  componentDidMount() {
    this.showMusics();
  }

  showMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsAlbum = await getMusics(id);
    // const response = musicsAlbum.shift();
    console.log(musicsAlbum);
    // console.log(response);
    this.setState({
      musics: musicsAlbum,
      albumInfos: musicsAlbum[0],
      isLoading: false,
    });
  };

  render() {
    const { musics,
      albumInfos: { artworkUrl100, collectionName, artistName },
      isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          isLoading
            ? (<Loading />)
            : (
              <div>
                <div>
                  <img src={ artworkUrl100 } alt="Album Cover" />
                  <h2 data-testid="album-name">{ collectionName }</h2>
                  <h3 data-testid="artist-name">{ artistName }</h3>
                </div>
                {musics.slice(1).map(({ trackName, previewUrl }, index) => (
                  <div key={ trackName }>
                    <MusicCard
                      musicName={ trackName }
                      musicPreview={ previewUrl }
                    />
                  </div>
                ))}
              </div>)
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
