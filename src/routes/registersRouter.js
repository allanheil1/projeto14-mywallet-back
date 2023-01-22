import express from 'express';
import { insertRegister } from '../controllers/registersController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { registersMiddleware } from '../middlewares/registersMiddleware.js';

const router = express.Router();

router.post('/register', authMiddleware, registersMiddleware, insertRegister);

export default router;