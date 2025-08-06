import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './connectDb.js';
import authRoute from './routes/authRoute.js';
import profileRoute from './routes/profileRoute.js';

dotenv.config();
connectDB();

const app = express();

//Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/profile', profileRoute);

app.get('/api/v1', (req, res) => {
  res.send('Hello World!');
});

//server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
