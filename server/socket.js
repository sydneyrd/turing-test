module.exports = function (httpServer, chatInstances, io) {

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
    socket.on('join-room', (roomId) => {
      socket.join(roomId)
      console.log(`Socket ${socket.id} joining ${roomId}`);
    });
    
    
    socket.on('send-message', (data) => {
      console.log(data)
      chatInstances[data.roomId].messages.push({ player: data.player, message: data.message });
      let messages = chatInstances[data.roomId].messages;
      io.to(data.roomId).emit('messages', 
        messages);
    });
    
  });
};
