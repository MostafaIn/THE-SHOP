import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () =>{
  return (
    <View style={styles.container}>
      <Text>The Basic Project Setup is ready!</Text>
    </View>
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
