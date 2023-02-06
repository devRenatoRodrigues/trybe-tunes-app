import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    isLoading: true,
  };

  // faz com que a função seja chamada assim que carrega a pagina !!
  componentDidMount() {
    this.getUserName();
  }

  // faz a requisição para a API e exibir o carregando enquanto a requisição não é cumprida
  getUserName = async () => {
    const user = await getUser();
    this.setState({
      userName: user.name,
      isLoading: false,
    });
  };

  render() {
    const { userName, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (

      <div data-testid="header-component">

        <div>
          <Link data-testid="link-to-search" to="/search">Search</Link>
        </div>
        <div>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        </div>
        <div>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </div>
        <h1 data-testid="header-user-name">
          Hello,
          {userName}
        </h1>
      </div>

    );
  }
}

export default Header;
