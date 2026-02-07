import { Router } from "express";
import EntryController from "../controllers/entry.controller.js";
import { authentificationMiddleware } from "../middleware/auth.middleware.js";

const entryRouter = Router();

entryRouter.use(authentificationMiddleware());

entryRouter.get("/", EntryController.getAll);
entryRouter.get("/:id", EntryController.getOne);
entryRouter.post("/", EntryController.create);
entryRouter.put("/:id", EntryController.update);
entryRouter.delete("/:id", EntryController.remove);

export default entryRouter;
