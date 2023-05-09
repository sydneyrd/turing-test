const { nanoid } = require('nanoid');
const randomWords = require('random-words');
const Player = require('./player');
const IPlayer = require('./iPlayer');
const AIPlayer = require('./aiPlayer');
const { fetchQuestions } = require('../my_http/questions');
class Game {
    constructor(id, io) {
        this.id = id;
        this.io = io;
        this.messages = [];
        this.players = [new Player(`${randomWords()}${randomWords()}`)];
        this.questions = [];
        this.getQuestions();
    }
   async getQuestions() {
    let questions = await fetchQuestions();
    console.log("questions", questions);
    this.questions = questions;
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
    getAIPlayers() {
        return this.players.filter((player) => player.isAI);
    }

    addPlayerMessage(player, message) {
        console.log("player", player);
        console.log("message", message);
        this.messages.push({ player: player, message: message });
    }

    getDynamicDelay(response) {
        const baseDelay = 1000;
        const delayPerWord = 300;
        const wordCount = response.split(' ').length;
        return baseDelay + wordCount * delayPerWord;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    async handleAIResponses() {
        const aiPlayers = this.getAIPlayers();
        if (!aiPlayers) return;
    
        // Shuffle AI players and select a random number of them to respond
        this.shuffleArray(aiPlayers);
        const numberOfRespondingPlayers = Math.floor(Math.random() * (aiPlayers.length + 1));
    
        let accumulatedDelay = 0;
    
        // Send updated messages to the AI API at dynamic intervals based on response length
        for (const aiPlayer of aiPlayers.slice(0, numberOfRespondingPlayers)) {
            const response = await aiPlayer.fetchResponse(this, this.messages);
            const delay = this.getDynamicDelay(response);
            accumulatedDelay += delay;
    
            setTimeout(() => {
                this.io.to(this.id).emit('messages', this.messages);
            }, accumulatedDelay);
        }
    }
    

}


module.exports = Game;

