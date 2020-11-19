import {StorageService} from './StorageService';

export class UserService {
  //Add an user to storage
  static async add(name, phone, age, address, symptoms) {
    let fieldErrors = [];
    if (name.length === 0) {
      fieldErrors.push('name');
    }
    if (phone.length === 0) {
      fieldErrors.push('phone');
    }
    if (age.length === 0) {
      fieldErrors.push('age');
    }
    if (fieldErrors.length > 0) {
      throw new Error(
        `The following fields are required: ${fieldErrors.join(', ')}`,
      );
    }
    let usersStorage = await StorageService.get('@users');
    let users = {};
    //check if @users are already initiated and parse the JSON string
    if (usersStorage) {
      users = usersStorage;
    }
    if (!address) {
      throw new Error('Failed looking for address');
    }
    if (users[name + phone]) {
      throw new Error('User already exists');
    }
    users[name + phone] = {name, phone, age, address, symptoms};
    await StorageService.set('@users', users);
  }

  //TODO remove user
  static async remove(name, phone) {}

  //TODO updateUser
  //key is name+phone
  static async update(key, name, phone, age, address, symptoms) {}

  //TODO handle filters
  static async get(filter = {}) {
    return await StorageService.get('@users');
  }
}
