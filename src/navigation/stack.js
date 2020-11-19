import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TabBar} from './tabbar';
import {DetailsController} from '../screens/DetailsScreen/DetailsController';

const Stack = createStackNavigator();

export const StackNavigator = (props) => {
  return (
    <Stack.Navigator {...props} headerMode={'none'}>
      <Stack.Screen name="Tab" component={TabBar} />
      <Stack.Screen name="Details" component={DetailsController} />
    </Stack.Navigator>
  );
};
