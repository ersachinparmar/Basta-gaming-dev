import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import { connectDB } from './utils/db';

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

connectDB();

export default app;
