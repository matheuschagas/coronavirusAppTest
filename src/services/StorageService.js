import AsyncStorage from '@react-native-async-storage/async-storage';

//Wrapper for any way to store, delete and get data. For now it's using AsyncStorage
export class StorageService {
  static async set(name, value) {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  }

  static async remove(name) {
    await AsyncStorage.removeItem(name);
  }

  static async get(name) {
    let data = await AsyncStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    }
    return data;
  }
}
