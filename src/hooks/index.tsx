import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {NavigationContainer} from '@react-navigation/native';
import database from '../database';
import {MealsProvider} from './meals';
import {NewMealProvider} from './newMeal';

const AppProvider: React.FC = ({children}) => {
  return (
    <DatabaseProvider database={database}>
      <MealsProvider>
        <NewMealProvider>
          <NavigationContainer>{children}</NavigationContainer>
        </NewMealProvider>
      </MealsProvider>
    </DatabaseProvider>
  );
};

export default AppProvider;
