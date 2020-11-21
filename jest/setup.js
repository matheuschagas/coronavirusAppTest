import * as ReactNative from 'react-native';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.doMock('react-native', () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Platform: {
        ...ReactNative.Platform,
        OS: 'android',
        Version: 123,
        isTesting: true,
        select: (objs) => objs.ios,
      },
      StyleSheet: {
        ...ReactNative.StyleSheet,
      },
      NativeModules: {
        ...ReactNative.NativeModules,
        PlatformLocalStorage: {},
        RNC_AsyncSQLiteDBStorageRNC_AsyncSQLiteDBStorage: {},
        RNCAsyncStorage: {},
        RNVectorIconsManager: {},
      },
    },
    ReactNative,
  );
});

jest.doMock('@react-native-async-storage/async-storage', () => {
  const AsyncStorage = {
    items: {},
    getItem: (name) => {
      return AsyncStorage.items[name];
    },
    setItem: (name, value) => {
      AsyncStorage.items[name] = value;
    },
    removeItem: (name) => {
      delete AsyncStorage.items[name];
    },
  };
  return AsyncStorage;
});
