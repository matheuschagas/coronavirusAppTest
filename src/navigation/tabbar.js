import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserController} from '../screens/UserScreen/UserController';
import {AddUserController} from '../screens/AddUserScreen/AddUserController';

const Tab = createBottomTabNavigator();

export const TabBar = (props) => {
  return (
    <Tab.Navigator {...props}>
      <Tab.Screen name={'Users'} component={UserController} />
      <Tab.Screen name={'Add User'} component={AddUserController} />
    </Tab.Navigator>
  );
};
