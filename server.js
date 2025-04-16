import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config(); 


connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);   

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
