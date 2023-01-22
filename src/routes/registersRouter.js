import express from 'express';
import { insertRegister, listRegisters } from '../controllers/registersController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { registersMiddleware } from '../middlewares/registersMiddleware.js';

const router = express.Router();

router.post('/register', authMiddleware, registersMiddleware, insertRegister);
router.get('/register', authMiddleware, listRegisters);

export default router;