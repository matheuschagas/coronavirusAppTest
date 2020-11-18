import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  static set(name, value) {
    return AsyncStorage.setItem(name, value);
  }

  static remove(name) {
    return AsyncStorage.removeItem(name);
  }

  static get(name) {
    return AsyncStorage.getItem(name);
  }
}
