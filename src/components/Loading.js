import React, { Component } from 'react';
import '../styles/Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }
}

export default Loading;
