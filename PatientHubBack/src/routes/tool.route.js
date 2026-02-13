import { Router } from "express";
import ToolController from "../controllers/tool.controller.js";

const toolRouter = Router();

toolRouter.get("/", ToolController.getAll);
toolRouter.get("/:id", ToolController.getOne);


export default toolRouter;