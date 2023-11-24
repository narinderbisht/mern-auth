import express from 'express';
import { testRoute } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', testRoute);

export default router;