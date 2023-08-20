import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Header.css';

class Header extends Component {
  state = {
    userName: '',
    image: '',
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
      image: user.image,
      isLoading: false,
    });
  };

  render() {
    const { image, userName, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (

      <nav
        data-testid="header-component"
        id="header-container"
        className="navbar navbar-expand-lg bg-primary nav-container"
      >
        <div className=" ul-container btn-group">
          <h6 className="nav-item item">
            <Link
              className="links btn  btn-outline-light"
              data-testid="link-to-search"
              to="/search"
            >
              Search

            </Link>
          </h6>
          <h6 className="nav-item item">
            <Link
              className="links btn  btn-outline-light"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favorites

            </Link>
          </h6>
          <h6 className="nav-item item">
            <Link
              data-testid="link-to-profile"
              to="/profile"
              className="links btn  btn-outline-light"
            >
              Profile

            </Link>
          </h6>
        </div>
        <div data-testid="header-user-name" id="head-user">
          <img
            src={ image }
            alt={ `imagem do ${userName}` }
          />
          <span className="links">
            {userName}
          </span>
        </div>
      </nav>

    );
  }
}

export default Header;
