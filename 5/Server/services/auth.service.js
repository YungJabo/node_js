import { userDto } from "../dto/user.dto.js";
import { userRepository } from "../model/user.model.js";

const validationData = (data) => {
  if (data.trim() === "") {
    return false;
  }
  return true;
};

class AuthService {
  async registration(dto) {
    const existUser = await userRepository.getUserByName(dto.username);
    if (existUser) {
      throw new Error(`Ошибка! Пользователь ${dto.username} уже существует!`);
    }
    const user = await userRepository.create(dto);
    return userDto(user);
  }

  async login({ username, password }) {
    const user = await userRepository.getUserByName(username);
    if (!user || !user.comparePassword(password)) {
      throw new Error("Неправильный логин или пароль!");
    }
    return userDto(user);
  }
  async updateProfile(newData, userId) {
    let isValid = true;
    const user = await userRepository.getUserById(userId);
    for (const [key, value] of Object.entries(newData)) {
      if (!validationData(value)) {
        isValid = false;
      }
    }
    if (!user.comparePassword(newData.oldPassword)) {
      throw new Error("Неправильный пароль");
    }
    if (isValid) {
      const updUser = await userRepository.update(userId, newData);
      return userDto(updUser);
    }
  }
}

export const authService = new AuthService();
