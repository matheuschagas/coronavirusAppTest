import {StorageService} from './StorageService';

export class UserService {
  //Add an user to storage
  static async add(name, phone, age, address, symptoms) {
    //TODO alert user if name and phone already in storage
    let usersStorage = await StorageService.getItem('@users');
    let users = {};
    //check if @users are already initiated and parse the JSON string
    if (usersStorage) {
      users = JSON.parse(usersStorage);
    }
    users[name + phone] = {name, phone, age, address, symptoms};
    StorageService.setItem('@users', JSON.stringify(users));
  }

  static async remove(name, phone) {}

  //key is name+phone
  static async update(key, name, phone, age, address, symptoms) {}

  static get(filter = {}) {}
}
