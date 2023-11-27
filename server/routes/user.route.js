import express from 'express';
import { testRoute, userUpdate } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const userRoutes = express.Router();

userRoutes.get('/', testRoute);
userRoutes.post('/update/:id', verifyUser, userUpdate);

export default userRoutes;