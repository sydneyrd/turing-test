const express = require('express');
const next = require('next');
const http = require('http');
const socket = require('./server/socket');
const chat = require('./server/chat');
const socketio = require('socket.io');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.static('public'));
  server.use(express.json());

  server.post('/api/chat', (req, res) => {
    const id = chat.createChatInstance();
    res.status(201).json({ id });
  });

  const httpServer = http.createServer(server);
  const io = socketio(httpServer); // Initialize the io instance here

  // Pass the io instance to the socket function
  socket(httpServer, chat.chatInstances, io);

  // Pass the io instance to the joinChatInstance function
  server.post('/api/chat/join', (req, res) => {
    const roomId = req.body.roomId;
    const result = chat.joinChatInstance(roomId, io);
    if (result.error) {
      res.status(404).json({ error: result.error });
    } else {
      res.status(200).json({ success: true });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
