import React,{ useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import rootReducer from './store/reducers';

import ShopNavigator from './navigation/ShopNavigator';

const store = createStore(rootReducer,applyMiddleware(thunk))

const fetchFonts = () =>{
  return Font.loadAsync({
    'lobster': require('./assets/fonts/Lobster-Regular.ttf'),
    'orbitron': require('./assets/fonts/Orbitron-Medium.ttf'),
    'abrilFatface': require('./assets/fonts/AbrilFatface-Regular.ttf')
  })
}
const App = () =>{
  const [isFontLoaded,setIsFontLoaded] = useState(false);

  if(!isFontLoaded){
    return <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsFontLoaded(true)}
        onError={err => console.log(err)}
      />
  };
  // console.log(isFontLoaded)
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
