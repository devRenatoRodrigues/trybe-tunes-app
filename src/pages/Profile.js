import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Profile.css';

class Profile extends Component {
  state = {
    isLoading: false,
    image: '',
    name: '',
    email: '',
    description: '',

  };

  componentDidMount() {
    this.FavoriteSongsRecovery();
  }

  FavoriteSongsRecovery = async () => {
    this.setState({ isLoading: true });
    const userInfos = await getUser();
    this.setState({
      image: userInfos.image,
      name: userInfos.name,
      email: userInfos.email,
      description: userInfos.description,
      isLoading: false,
    });
  };

  render() {
    const { name,
      email,
      description,
      image,
      isLoading,
    } = this.state;
    return (
      <div
        data-testid="page-profile"
        className="page-profile"
      >
        <Header />
        {isLoading ? <Loading /> : (
          <div className="profile-container">
            <div className="profile-info">
              <img
                src={ image }
                data-testid="profile-image"
                className="profile-image"
                alt={ `imagem do ${name} ` }
              />
              <Link
                to="./profile/edit"
                className="profile-edit-link"
              >
                Editar perfil

              </Link>
              <h4>Nome</h4>
              <p>{name}</p>
              <h4>E-Mail</h4>
              <p>{email}</p>
              <h4>Descrição</h4>
              <p>{description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
