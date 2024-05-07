import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import register from './routes/register';
import auth from './routes/auth';
import verifyToken from './middleware/verifyToken'; 
import dotenv from "dotenv";

dotenv.config();

const app = express().use(bodyParser.json());

app.use('/ruta-protegida', verifyToken);


app.use('/register', register);
app.use('/auth', auth);

const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});
