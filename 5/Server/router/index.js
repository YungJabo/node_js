import { authController, userController } from "../controller/index.js";
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

export default router;
