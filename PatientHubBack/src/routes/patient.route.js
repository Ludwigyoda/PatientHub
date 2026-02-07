import { Router } from "express";
import PatientController from "../controllers/patient.controller.js";
import { authentificationMiddleware, authorizeMiddleware } from "../middleware/auth.middleware.js";

const patientRouter = Router();

patientRouter.use(authentificationMiddleware());

patientRouter.get("/me", PatientController.getMe);
patientRouter.get("/", authorizeMiddleware("ADMIN"), PatientController.getAll);
patientRouter.get("/:id", PatientController.getOne);
patientRouter.put("/:id", PatientController.update);
patientRouter.delete("/:id", PatientController.remove);

export default patientRouter;
