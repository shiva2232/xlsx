require('dotenv').config();
import express from 'express';
import cors from 'cors';
import userrouter from './routes/user';

const app = express();

//==============>> config <<====================

const corsOptions = {
  origin: ['http://localhost'], // todo: update on production
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

//==============>> Routes <<====================

app.use('/', userrouter)

//==============>> Listen <<====================

app.listen(process.env.PORT, () => {
  console.log("app is running on port: " + process.env.PORT);
})