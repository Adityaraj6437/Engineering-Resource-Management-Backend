import express from "express";
import { getAllProjects,
  createProject,
  getProjectById } from "../controllers/project.controller.js";

import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";
const projectRoutes = express.Router();

projectRoutes.get("/", authenticate, getAllProjects);
projectRoutes.get("/:id", authenticate, getProjectById);
projectRoutes.post("/", authenticate, authorizeRoles("manager"), createProject);

export default projectRoutes;