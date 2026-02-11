import { Router } from "express";
import PatientController from "../controllers/patient.controller.js";
import { authentificationMiddleware, authorizeMiddleware } from "../middleware/auth.middleware.js";

const patientRouter = Router();

patientRouter.use(authentificationMiddleware());

patientRouter.get("/me", PatientController.getMe);

export default patientRouter;
