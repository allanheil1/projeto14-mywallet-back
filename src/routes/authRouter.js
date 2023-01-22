import express from 'express';
import { signUp, signIn } from '../controllers/authController.js'

const router = express.Router();

router.post('/cadastro', signUp);
router.post('/', signIn);

export default router;