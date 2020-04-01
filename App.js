import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './store/reducers';

import ShopNavigator from './navigation/ShopNavigator';

const store = createStore(rootReducer)

const App = () =>{
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
