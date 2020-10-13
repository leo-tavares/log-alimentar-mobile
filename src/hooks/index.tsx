import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {NavigationContainer} from '@react-navigation/native';
import database from '../database';

const AppProvider: React.FC = ({children}) => {
  return (
    <DatabaseProvider database={database}>
      <NavigationContainer>{children}</NavigationContainer>
    </DatabaseProvider>
  );
};

export default AppProvider;
