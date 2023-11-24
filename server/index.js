import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const db = mongoose.connect(process.env.MONGODB).then( () => {
    console.log("Database connection is working");
}).catch(( err ) => {
    console.log("Database is not working. Error: " + err);
})

app.listen(3000, () => {
    console.log("server is running on port 3000.");
});