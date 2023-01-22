import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from './routes/authRouter.js';
import registersRouter from './routes/registersRouter.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(registersRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));