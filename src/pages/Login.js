import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/Login.css';

class Login extends Component {
  state = {
    disabled: true,
    isLoading: false,
    userName: '',
  };

  handleClick = async () => {
    const { history } = this.props;
    this.setState({ isLoading: true });
    const { userName } = this.state;
    await createUser({ name: userName });
    this.setState({ isLoading: false });
    history.push('/search');
  };

  handleChange = (event) => {
    const { value } = event.target;
    const minLength = 3;
    const nameLength = value.length;
    if (nameLength >= minLength) {
      this.setState({
        userName: value,
        disabled: false,
        isLoading: false,
      });
    }
  };

  render() {
    const { disabled, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <main data-testid="page-login" id="login-container">
        <form id="forms-content" onSubmit={ this.handleClick }>
          <label id="label-name" htmlFor="userName">
            Your Name:
            <input
              className="form-control"
              placeholder="Insert your name"
              data-testid="login-name-input"
              type="text"
              name="userName"
              onChange={ this.handleChange }
            />
          </label>
          <button
            id="login-button"
            className="btn btn-primary"
            name="button"
            data-testid="login-submit-button"
            disabled={ disabled }
            value="Entrar"
            type="submit"
          >
            Entrar
          </button>
        </form>

      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Login;
