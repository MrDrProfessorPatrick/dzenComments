import express from 'express';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import dotenv from "dotenv"

import commentsRouter from './comments/commentsRouter.js';

dotenv.config()

const port = process.env.PORT || 5002;
const app = express();

app.use(express.json({ limit: '50mb' }));

app.use('/api', cors({
    origin: true,
    credentials: true,
}), 
    commentsRouter
);


app.listen(port, () => { console.log(`server started on port ${port}`) });
