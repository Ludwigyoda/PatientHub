import { Router } from "express";
import ToolController from "../controllers/tool.controller.js";

const toolRouter = Router();

toolRouter.get("/", ToolController.getAll);
toolRouter.get("/:id", ToolController.getOne);


//mettre les autorisation admin 
toolRouter.post("/", ToolController.create);
toolRouter.put("/:id", ToolController.update);
toolRouter.delete("/:id", ToolController.remove);

export default toolRouter;