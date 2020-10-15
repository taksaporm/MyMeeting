/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Routes from './routes';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
  }
  
  render() {
    return (
      <Routes />
    );
  }
}

export default App;
