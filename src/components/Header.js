import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    isLoading: true,
  };

  componentDidMount() {
    this.getUserName();
  }

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
        <h1 data-testid="header-user-name">
          Hello,
          {userName}
        </h1>
      </div>
    );
  }
}

export default Header;
