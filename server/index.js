import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Database connection is working");
}).catch((err) => {
    console.log("Database is not working. Error: " + err);
});
/*
 get directory path of the server. On localhost we know the path but on server
we don't know the directory path, so we need to get the dynamic path first */

const __dirname = path.resolve();

const app = express();
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(cookieParser());
app.use(express.json());


app.listen(3000, () => {
    console.log("server is running on port 3000.");
});


app.use('/api/user', userRoutes);
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