import express from 'express';
import { insertRegister } from '../controllers/registersController.js';

const router = express.Router();

router.post('/register', insertRegister);

export default router;