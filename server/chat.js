const { nanoid } = require('nanoid');
const Game = require('./class/game');
const AIPlayer = require('./class/aiPlayer');
const Player = require('./class/player');
const randomWords = require('random-words');

const chatInstances = {};

function createChatInstance(io) {
  const id = nanoid(4);
  const game = new Game(id, io);
  chatInstances[id] = game;
  io.to(id).emit('redirect-to-chat');
  return {id: id, player: game.players[0].name};
}

function joinChatInstance(roomId, io) {
  const game = chatInstances[roomId];
  if (!game) {
    return { error: 'Game session not found' };
  }

  if (game.isFull()) {
    return { error: 'Game session is full' };
  }

  const playerName = `${randomWords()}${randomWords()}`;
  game.addPlayer(new Player(playerName));

  if (game.isFull()) {
    console.log("api request should happen here");
    // Add 5 AI players
    for (let i = 0; i < 5; i++) {
      const aiPlayer = new AIPlayer(`${randomWords()}${randomWords()}`);
      game.addPlayer(aiPlayer);
    }
    setTimeout(() => {
      io.to(roomId).emit('redirect-to-chat');
    }, 5000); // Redirect to chat after 5 seconds
  }

  return { success: true, player: playerName };
}

module.exports = {
  chatInstances,
  createChatInstance,
  joinChatInstance,
};

