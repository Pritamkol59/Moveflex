import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Stacknavigator from './src/screens/navigations/Stacknavigator';
import { Provider } from 'react-redux';
import store from './src/redux/Storages';

const App = () => {
  return (
    <Provider store={store}>
      <Stacknavigator />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
