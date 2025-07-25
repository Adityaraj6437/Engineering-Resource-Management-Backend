import express from "express";
import {getAllAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignment.controller.js";

import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";
const assignmentRoutes = express.Router();

assignmentRoutes.get("/", authenticate, getAllAssignments);
assignmentRoutes.post("/", authenticate, authorizeRoles("manager"), createAssignment);
assignmentRoutes.put("/:id", authenticate, authorizeRoles("manager"), updateAssignment);
assignmentRoutes.delete("/:id", authenticate, authorizeRoles("manager"), deleteAssignment);

export default assignmentRoutes;