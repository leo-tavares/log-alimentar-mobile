import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Dashboard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
