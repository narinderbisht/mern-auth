import express from 'express';
import { testRoute, userDelete, userUpdate } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const userRoutes = express.Router();

userRoutes.get('/', testRoute);
userRoutes.post('/update/:id', verifyUser, userUpdate);
userRoutes.delete('/delete/:id', verifyUser, userDelete);

export default userRoutes;