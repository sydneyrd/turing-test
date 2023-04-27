// server/chat.js

const { nanoid } = require('nanoid');
const randomWords = require('random-words');

const chatInstances = {};
function createChatInstance(io) {
  const id = nanoid(4);
  chatInstances[id] = {
    id,
    messages: [],
    players: [{player:`${randomWords()}${randomWords()}`}],
  };
  io.to(id).emit('redirect-to-chat');
  return {id: id, player: chatInstances[id].players[0]}};

function joinChatInstance(roomId, io) {
    const chatInstance = chatInstances[roomId];
    if (!chatInstance) {
      return { error: 'Game session not found' };
    }
  
    if (chatInstance.players.length >= 5) {
      return { error: 'Game session is full' };
    }
  
    const playerName = {player:`${randomWords()}${randomWords()}`};
    chatInstance.players.push(playerName);
  
    if (chatInstance.players.length === 5) {
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
