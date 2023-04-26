const socketio = require('socket.io');

module.exports = function (httpServer, chatInstances, io) {
  const io = socketio(httpServer);

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
    socket.on('join-room', (roomId) => {
      socket.join(roomId)
    
    });
    socket.on('message', (message) => {
      console.log(`Received message: ${message}`);
      io.emit('message', message);
    });
    socket.on('send-message', (data) => {
      chatInstances[data.roomId].messages.push({ playerId: data.playerId, message: data.message });
      io.to(data.roomId).emit('message', chatInstances[data.roomId].messages);
    });
  });
};
