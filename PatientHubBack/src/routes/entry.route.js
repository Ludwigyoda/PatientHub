import { Router } from "express";
import EntryController from "../controllers/entry.controller.js";
import { authentificationMiddleware, authorizeMiddleware } from "../middleware/auth.middleware.js";

const entryRouter = Router();

entryRouter.use(authentificationMiddleware());
entryRouter.use(authorizeMiddleware());

entryRouter.get("/", EntryController.getAll);
entryRouter.get("/:id", EntryController.getOne);
entryRouter.post("/", EntryController.create)

export default entryRouter;
