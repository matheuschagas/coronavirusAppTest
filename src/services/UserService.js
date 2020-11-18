import AsyncStorage from '@react-native-async-storage/async-storage';
export class UserService {
  //Add an user to storage
  static async add(name, phone, age, address, symptoms) {
    let usersStorage = await AsyncStorage.getItem('@users');
    let users = {};
    //check if @users are already initiated and parse the JSON string
    if (usersStorage) {
      users = JSON.parse(usersStorage);
    }
    users[name + phone] = {name, phone, age, address, symptoms};
    AsyncStorage.setItem('@users', JSON.stringify(users));
  }

  static async remove(name, phone) {}

  //key is name+phone
  static async update(key, name, phone, age, address, symptoms) {}

  static get(filter = {}) {}
}
