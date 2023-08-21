import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/Profile.css';

class ProfileEdit extends Component {
  state = {
    isLoading: false,
    image: '',
    name: '',
    email: '',
    description: '',
    isButtonDisabled: true,
  };

  componentDidMount() {
    this.UserInfosRecovery();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const {
      image,
      name,
      email,
      description,
    } = this.state;
    await updateUser({ image,
      name,
      email,
      description });
    history.push('/profile');
  };

  UserInfosRecovery = async () => {
    this.setState({ isLoading: true });
    const userInfos = await getUser();
    this.setState({
      name: userInfos.name,
      email: userInfos.email,
      description: userInfos.description,
      image: userInfos.image,
      isLoading: false,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.updateButtonDisabledState);
  };

  isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  updateButtonDisabledState = () => {
    const { name, email, description } = this.state;
    const isButtonDisabled = !name || !email || !description || !this.isValidEmail(email);
    this.setState({ isButtonDisabled });
  };

  render() {
    const { name,
      email,
      description,
      image,
      isLoading,
      isButtonDisabled,
    } = this.state;
    return (
      <div
        data-testid="page-profile-edit"
        className="page-profile"
      >
        <Header />
        {isLoading ? <Loading /> : (
          <>
            <p>Editar perfil</p>
            <form className="profile-container">
              <label htmlFor="image">
                Your url image:
                <input
                  type="text"
                  id="image"
                  placeholder={ image }
                  value={ image }
                  data-testid="edit-input-image"
                  onChange={ this.handleChange }
                  name="image"
                />
              </label>
              <label
                htmlFor="name"
                className="form-label"
              >
                Your Name:
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  placeholder={ name }
                  value={ name }
                  data-testid="edit-input-name"
                  onChange={ this.handleChange }
                  name="name"
                />
              </label>
              <label
                htmlFor="email"
                className="form-label"
              >
                Your Email:
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  placeholder={ email }
                  value={ email }
                  data-testid="edit-input-email"
                  onChange={ this.handleChange }
                  name="email"
                />
              </label>
              <label
                className="form-label"
                htmlFor="description"
              >
                Your Description
                <input
                  className="form-control"
                  data-testid="edit-input-description"
                  type="text"
                  id="description"
                  placeholder={ description }
                  value={ description }
                  onChange={ this.handleChange }
                  name="description"
                />
              </label>
              <button
                data-testid="edit-button-save"
                className="btn btn-primary"
                type="submit"
                disabled={ isButtonDisabled }
                onClick={ this.handleSubmit }
              >
                Salvar
              </button>
            </form>
          </>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
