const initialData = {
  users: [],
};
export class UserService {
  static users = initialData.users;

  static async add(name, phone, age, address, symptoms) {}

  static async remove(name, phone) {}

  //key is name+phone
  static async update(key, name, phone, age, address, symptoms) {}

  static clean() {
    UserService.users = initialData;
  }
}
