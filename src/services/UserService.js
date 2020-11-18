import {StorageService} from './StorageService';

export class UserService {
  //Add an user to storage
  static async add(name, phone, age, address, symptoms) {
    //TODO alert user if name and phone already in storage
    let usersStorage = await StorageService.get('@users');
    let users = {};
    //check if @users are already initiated and parse the JSON string
    if (usersStorage) {
      users = usersStorage;
    }
    users[name + phone] = {name, phone, age, address, symptoms};
    await StorageService.set('@users', JSON.stringify(users));
  }

  //TODO remove user
  static async remove(name, phone) {}

  //TODO updateUser
  //key is name+phone
  static async update(key, name, phone, age, address, symptoms) {}

  //TODO handle filters
  static get(filter = {}) {}
}
