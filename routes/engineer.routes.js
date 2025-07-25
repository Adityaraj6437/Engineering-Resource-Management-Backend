import express from 'express';
import { getEngineers, getEngineerCapacity } from '../controllers/engineer.controller.js';
import { authenticate,authorizeRoles } from '../middleware/auth.middleware.js';

const engineerRoutes = express.Router();

engineerRoutes.get('/engineers', authenticate, authorizeRoles('manager'), getEngineers);
engineerRoutes.get('/engineer/capacity/:id', authenticate, getEngineerCapacity);

export default engineerRoutes;