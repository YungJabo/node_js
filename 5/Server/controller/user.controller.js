import { userService } from "../services/index.js";
class UserController {
  async profile(req, res) {
    try {
      const { password, ...user } = await userService.profile(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async updatePermission(req, res) {
    try {
      const { id } = req.params;
      const users = await userService.updatePermission(req.body, id);
      res.json(users);
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async delUser(req, res) {
    try {
      const { id } = req.params;
      const users = await userService.delUser(id);
      res.json(users);
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}

export const userController = new UserController();
