const IPlayer = require('./iPlayer');
const {fetchGPTData }= require('../my_http/openai'); 
const {generateRoleMessage} = require('../my_http/personality/types');

class AIPlayer extends IPlayer {
  constructor(name) {
    super(name, true);
    this.personality = null;
    this.setPersonality();
  }

  setPersonality() {
    let systemMessage = generateRoleMessage(this.name)
    this.personality = systemMessage
  }
  async fetchResponse(game, messages) {
    const response = await fetchGPTData(this.personality, messages);
    if (response) {
      game.addPlayerMessage(this.name, response );
    }
    return response
  }
}


module.exports = AIPlayer;
