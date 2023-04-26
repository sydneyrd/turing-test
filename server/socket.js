module.exports = function (httpServer, chatInstances, io) {

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
    // socket.on('send-message', (data) => {
    //   chatInstances[data.roomId].messages.push({ playerId: data.playerId, message: data.message });
    //   io.to(data.roomId).emit('message', chatInstances[data.roomId].messages);
    // });
    socket.on('send-message', (data) => {
      chatInstances[data.roomId].messages.push({ player: data.player, message: data.message });
      io.to(data.roomId).emit('message', {
        messages: chatInstances[data.roomId].messages,
        playerNames: chatInstances[data.roomId].players, // Include the player names here
      });
    });
    
  });
};
