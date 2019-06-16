import React, { Component } from 'react';
import Login from './Login';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  // Lifecycle methods, etc...

  render() {
    return (
      <Login determineRender='SignupSequence4' />
    );
  }
}

export default LoginContainer;
