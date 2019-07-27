import React, { Component } from 'react';
import Login from './Login';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: 'Login',
    };
  }
  // Lifecycle methods, etc...

  render() {
    return (
      <Login />
    );
  }
}

export default LoginContainer;
