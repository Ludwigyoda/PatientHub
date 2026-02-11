import { Router } from "express";
import CategoryController from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getOne);
categoryRouter.post("/", CategoryController.create);


export default categoryRouter;
