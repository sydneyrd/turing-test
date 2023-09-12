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
    socket.on('send-message', async (data) => {
      console.log(data);
      const game = chatInstances[data.roomId];
      game.addPlayerMessage(data.player, data.message);
      io.to(data.roomId).emit('messages', game.messages);
      game.handleAIResponses();
    });
    socket.on('get-players', (roomId) => {
      const game = chatInstances[roomId]; // Assuming roomId is available in the scope
      if (game) {
        const playerData = game.players.map(player => ({ name: player.name }));
        socket.emit('players', playerData);
      }
    });
    
  });
};
