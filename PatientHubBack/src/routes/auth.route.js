import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { authorizeMiddleware, authentificationMiddleware } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);


authRouter.put('/updatePassword', authentificationMiddleware(), authorizeMiddleware(), AuthController.updatePassword);

export default authRouter;
