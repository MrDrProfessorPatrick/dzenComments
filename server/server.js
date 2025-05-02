import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
// import cookieParser from 'cookie-parser';
import { createServer } from 'http';
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

const server = createServer(app);

const wss = new WebSocketServer({ server, path: '/ws' });

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('New WebSocket connection');
  
    ws.on('message', (message) => {
      console.log('Received message:', message.toString());
  
      // Echo to all clients
      for (let client of clients) {
        if (client.readyState === ws.OPEN) {
          client.send(message.toString().slice());
        }
      }
    });

    ws.on('close', () => {
        console.log('WebSocket disconnected');
        clients.delete(ws);
      });
    
      ws.on('error', (err) => {
        console.error('WebSocket error', err);
      });
    });

app.listen(port, () => { console.log(`server started on port ${port}`) });
