import express from 'express';
const app = express();
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';

//routers
import userRouter from './routes/userRouter.js'

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors())
app.use(express.json());
app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 8000

try {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`);
  });
} catch (error) {
  console.log(error)
  process.exit(1)
}

