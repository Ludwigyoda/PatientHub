import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { authorizeMiddleware, authentificationMiddleware } from "../middleware/auth.middleware.js";

const authRouter = Router();

// Routes publiques
authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);

// Routes protégées
// Note: Le middleware d'authentification doit être appliqué globalement ou ici
// Pour l'updatePassword, on suppose qu'il faut être authentifié
authRouter.put('/updatePassword', authentificationMiddleware(), authorizeMiddleware(), AuthController.updatePassword);

export default authRouter;
