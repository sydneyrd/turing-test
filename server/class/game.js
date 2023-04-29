const { nanoid } = require('nanoid');
const randomWords = require('random-words');
const Player = require('./player');
const IPlayer = require('./iPlayer');
const AIPlayer = require('./aiPlayer');
class Game {
    constructor(id) {
        this.id = id;
        this.messages = [];
        this.players = [new Player(`${randomWords()}${randomWords()}`)]
    }
    addPlayer(player) {
        if (player instanceof IPlayer) {
            this.players.push(player);
        } else {
            throw new Error("Invalid player object");
        }
    };
    isFull() {
        return this.players.length >= 5;
    }
    getAIPlayer() {
        return this.players.filter((player) => player.isAI);
      }
      
    addPlayerMessage(player, message) {
        console.log("player", player)
        console.log("message", message)
          this.messages.push({ player: player, message: message });
        }
        
      
}


module.exports = Game;

