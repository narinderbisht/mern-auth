import express from 'express';
import { google, signOut, signin, signup } from '../controllers/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.post('/google', google);
authRoutes.get('/signout', signOut);
export default authRoutes;