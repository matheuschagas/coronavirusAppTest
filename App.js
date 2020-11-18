import React from 'react';
import {StatusBar} from 'react-native';
import {Navigator} from './src/navigation/navigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Navigator />
    </>
  );
};

export default App;
