import React from 'react';
import {StatusBar} from 'react-native';
import AppProvider from './hooks';
import Routes from './routes';

const App = () => {
  return (
    <AppProvider>
      <StatusBar hidden />
      <Routes />
    </AppProvider>
  );
};

export default App;
