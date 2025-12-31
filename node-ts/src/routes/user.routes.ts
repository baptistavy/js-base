import { Router } from "express";
import * as userController from "../controllers/user.controllers";

const router = Router();

router.post("/register", userController.createUser);
router.post("/verify-email", userController.verifyEmail);
router.post("/login", userController.login);

router.get("/", userController.getUsers);

export default router;