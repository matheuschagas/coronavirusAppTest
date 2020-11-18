import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabBar} from './tabbar';

export const Navigator = () => {
  return (
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  );
};
