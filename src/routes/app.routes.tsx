import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Progress from '../pages/Progress';
import Settings from '../pages/Settings';

const BottomTab = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={'Dashboard'}
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
      <BottomTab.Screen name={'Progress'} component={Progress} />
      <BottomTab.Screen name={'Settings'} component={Settings} />
    </BottomTab.Navigator>
  );
};

export default AppRoutes;
