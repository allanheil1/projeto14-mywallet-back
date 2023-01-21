import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';
import { signUp } from './controllers/authController.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.post('/signup', signUp);


// ROTAS:

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));