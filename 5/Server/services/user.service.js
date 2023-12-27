import { userDto } from "../dto/user.dto.js";
import { userRepository } from "../model/user.model.js";

class UserService {
  async profile(id) {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new Error("Пользователь не авторизован!");
    }
    return userDto(user);
  }
  async getUsers() {
    const users = await userRepository.getUsers();
    return users;
  }
  async updatePermission(data, userId) {
    const users = await userRepository.updatePermission(data, userId);
    return users;
  }
  async delUser(userId) {
    const users = await userRepository.delUser(userId);
    return users;
  }
}

export const userService = new UserService();
