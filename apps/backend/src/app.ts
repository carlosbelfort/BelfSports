import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import healthRoutes from './routes/health.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(healthRoutes);

export default app;
