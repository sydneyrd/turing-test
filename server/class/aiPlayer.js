const IPlayer = require('./iPlayer');
const {fetchGPTData }= require('../my_http/openai'); // this is the line that is causing the error

class AIPlayer extends IPlayer {
  constructor(name) {
    super(name, true);
  }

  async fetchResponse(game, messages) {
    const response = await fetchGPTData(this.name, messages);
    if (response) {
      game.addPlayerMessage(this.name, response );
    }
    return response
  }
}


module.exports = AIPlayer;
