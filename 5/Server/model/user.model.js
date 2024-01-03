import { UserModel } from "./schemas/user.schema.js";
import { userDto } from "../dto/user.dto.js";

class UserRepository {
  async getUserById(id) {
    const user = await UserModel.findById({ _id: id });
    return user;
  }
  async getUserByName(username) {
    const user = await UserModel.findOne({ username });
    return user;
  }
  async create(dto) {
    const userData = userDto(dto);
    const userModel = new UserModel(userData);
    userModel.setPassword(dto.password);
    const user = await userModel.save();
    return user;
  }
  async update(userId, data) {
    const userModel = await UserModel.findById(userId);
    console.log(data);
    if (data.firstName !== "") {
      userModel.firstName = data.firstName;
    }
    if (data.middleName !== "") {
      userModel.middleName = data.middleName;
    }
    if (data.surName !== "") {
      userModel.surName = data.surName;
    }

    userModel.image =
      data.avatar === "null"
        ? "https://icons-for-free.com/iconfiles/png/512/profile+user+icon-1320166082804563970.png"
        : data.avatar;
    if (data.newPassword !== "") {
      if (!userModel.comparePassword(data.oldPassword)) {
        throw new Error("Неправильный пароль");
      } else {
        userModel.setPassword(data.newPassword);
      }
    }

    const updUser = await userModel.save();
    return updUser;
  }
  async getUsers() {
    const users = await UserModel.find();
    const filteredUsers = users.map(userDto);
    return filteredUsers;
  }

  async updatePermission(data, userId) {
    const userModel = await UserModel.findById(userId);
    userModel.permission = data.permission;
    const updateUser = userModel.save();
    const users = await this.getUsers();
    return users;
  }
  async delUser(userId) {
    await UserModel.findByIdAndDelete(userId);
    const users = await this.getUsers();
    return users;
  }
}
export const userRepository = new UserRepository();
