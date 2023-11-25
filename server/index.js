import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Database connection is working");
}).catch((err) => {
    console.log("Database is not working. Error: " + err);
});

const app = express();
app.listen(3000, () => {
    console.log("server is running on port 3000.");
});

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({ 
        success: false,
        message,
        statusCode
     });
});