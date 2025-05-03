import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { Buffer } from 'node:buffer';
// import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import dotenv from "dotenv"

import commentsRouter from './comments/commentsRouter.js';
import { createCommentHelper } from './comments/helpers.js';

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
    console.log('New WebSocket connection');
    clients.add(ws);
  
    ws.on('message', (message) => {
      const stringMessage = message.toString();
      const parsedMessage = JSON.parse(stringMessage);
      if(parsedMessage && parsedMessage.type && parsedMessage.type === 'connection') return;
      const { postId, parentId, userName, email, homepage, message:textMessage } = parsedMessage;
      
      createCommentHelper({postId, parentId, userName, email, homepage, message: textMessage}).then(comment => {
        const commentBuffer = Buffer.from(JSON.stringify(comment));
        
        for (let client of clients) {
          if (client.readyState === ws.OPEN) {
            client.send(commentBuffer);
          }
        }
      })
    });

    ws.on('close', () => {
        console.log('WebSocket disconnected');
        clients.delete(ws);
      });
    
      ws.on('error', (err) => {
        console.error('WebSocket error', err);
      });
    });

server.listen(port, () => { console.log(`server started on port ${port}`) });
