import express from 'express';
import { signUp, signIn } from '../controllers/authController.js'

const router = express.Router();

router.post('/signUp', signUp);
router.post('/login', signIn);

export default router;