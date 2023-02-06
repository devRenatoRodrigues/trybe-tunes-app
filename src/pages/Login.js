import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
      <div data-testid="page-login">
        <form>
          <label htmlFor="userName">
            Your Name:
            <input
              placeholder="Insert your name"
              data-testid="login-name-input"
              type="text"
              name="userName"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >

            Entrar
          </button>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Login;
