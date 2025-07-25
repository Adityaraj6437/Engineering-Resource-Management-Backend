// backend/server.js
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {connectDB} from './config/db.js';
// import authRoutes from './routes/authRoutes.js'
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import engineerRoutes from './routes/engineer.routes.js';
import assignmentRoutes from './routes/assignment.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(
  cors({
    origin:'*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());
// app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/engineers", engineerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/assignments", assignmentRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('🌐 Backend API running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;