import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserController} from '../screens/UserScreen/UserController';
import {AddUserController} from '../screens/AddUserScreen/AddUserController';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export const TabBar = (props) => {
  return (
    <Tab.Navigator
      {...props}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Users') {
            iconName = 'format-line-weight';
          } else if (route.name === 'Add User') {
            iconName = 'human';
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name={'Users'} component={UserController} />
      <Tab.Screen name={'Add User'} component={AddUserController} />
    </Tab.Navigator>
  );
};
