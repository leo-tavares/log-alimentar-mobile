import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {NavigationContainer} from '@react-navigation/native';
import database from '../database';
import {MealsProvider} from './meals';

const AppProvider: React.FC = ({children}) => {
  return (
    <DatabaseProvider database={database}>
      <MealsProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </MealsProvider>
    </DatabaseProvider>
  );
};

export default AppProvider;
