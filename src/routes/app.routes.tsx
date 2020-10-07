import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Progress from '../pages/Progress';
import Settings from '../pages/Settings';
import NewMeal from '../pages/NewMeal';

const BottomTab = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={'Dashboard'}
      tabBarOptions={{
        style: {height: 60},
        labelStyle: {color: 'black'},
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({size, color}) => {
          const iconName: {[key: string]: string} = {
            Profile: 'user',
            Progress: 'trending-up',
            Settings: 'settings',
            Dashboard: 'activity',
          };
          return <Icon name={iconName[route.name]} size={size} color={color} />;
        },
      })}>
      <BottomTab.Screen name={'Profile'} component={Profile} />
      <BottomTab.Screen name={'Dashboard'} component={Dashboard} />
      <BottomTab.Screen
        name={'NewMeal'}
        component={NewMeal}
        options={{
          tabBarLabel: () => null,
          unmountOnBlur: true,
          tabBarIcon: ({color, focused}) => {
            return (
              <Icon
                name={'plus'}
                style={StyleSheet.flatten([
                  styles.NewMealICon,
                  focused
                    ? styles.NewMealIConActive
                    : styles.NewMealIConDeactivate,
                ])}
                size={50}
                color={focused ? 'white' : color}
              />
            );
          },
        }}
      />
      <BottomTab.Screen name={'Progress'} component={Progress} />
      <BottomTab.Screen name={'Settings'} component={Settings} />
    </BottomTab.Navigator>
  );
};

export default AppRoutes;

const styles = StyleSheet.create({
  NewMealICon: {
    borderRadius: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NewMealIConActive: {
    backgroundColor: '#2b65ed',
  },
  NewMealIConDeactivate: {
    backgroundColor: '#7298f3',
  },
});
