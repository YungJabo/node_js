import {
  authController,
  userController,
  newsController,
} from "../controller/index.js";
import { authMiddleware } from "../middleware/index.js";
import { Router } from "express";

const router = Router();

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.post(
  "/refresh-token",
  authMiddleware.authentication,
  authController.refreshToken
);
router.get("/profile", authMiddleware.authentication, userController.profile);
router.patch(
  "/profile",
  authMiddleware.authentication,
  authController.updateProfile
);
router.post("/news", authMiddleware.authentication, newsController.addNews);
router.get("/news", authMiddleware.authentication, newsController.showNews);

// ПРОВЕРИТЬ, НЕ ОТКРЫВАЕТСЯ РЕАДКТИРОВАНИЕ
router.patch(
  "/news/:id",
  authMiddleware.authentication,
  newsController.updateNews
);
// ................................

router.delete(
  "/news/:id",
  authMiddleware.authentication,
  newsController.delNews
);

router.get("/users", authMiddleware.authentication, userController.getUsers);
router.patch(
  "/users/:id/permission",
  authMiddleware.authentication,
  userController.updatePermission
);
router.delete(
  "/users/:id",
  authMiddleware.authentication,
  userController.delUser
);

// router.delete("/users/:id");..

export default router;
