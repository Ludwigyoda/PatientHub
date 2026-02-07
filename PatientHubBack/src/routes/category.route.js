import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getOne);
categoryRouter.post("/", CategoryController.create);
categoryRouter.put("/:id", CategoryController.update);
categoryRouter.delete("/:id", CategoryController.remove);

export default categoryRouter;
