import { authService, tokenService } from "../services/index.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
class AuthController {
  async registration(req, res) {
    try {
      const { password, ...user } = await authService.registration(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(409).json({
        message: error.message,
      });
    }
  }

  async updateProfile(req, res) {
    try {
      upload.none()(req, res, async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Ошибка при обработке данных формы" });
        }
        const { password, ...user } = await authService.updateProfile(
          req.body,
          req.user.id
        );
        const payload = {
          user: { id: user.id },
        };
        const tokens = tokenService.createPairTokens(payload);
        res.json({
          ...user,
          ...tokens,
        });
      });
    } catch (error) {
      res.status(408).json({
        message: error.message,
      });
    }
  }
  async login(req, res) {
    try {
      const { password, ...user } = await authService.login(req.body);
      const payload = {
        user: { id: user.id },
      };
      const tokens = tokenService.createPairTokens(payload);
      res.json({
        ...user,
        ...tokens,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  refreshToken(req, res) {
    try {
      const tokens = tokenService.refreshTokens({ user: req.user });
      console.log(tokens);
      res.json(tokens);
    } catch (error) {
      res.status(401).json({
        message: "Пользователь не авторизован!",
      });
    }
  }
}

export const authController = new AuthController();
