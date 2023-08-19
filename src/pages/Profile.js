import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <div>
              <img
                src={ image }
                data-testid="profile-image"
                alt={ `imagem do ${name} ` }
              />
              <Link to="./profile/edit">Editar perfil</Link>
              <h4>Nome</h4>
              <p>{name}</p>
              <h4>email</h4>
              <p>{email}</p>
              <h4>description</h4>
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
