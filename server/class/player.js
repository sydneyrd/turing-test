const IPlayer = require('./iPlayer');

class Player extends IPlayer {
  constructor(name) {
    super(name);
  }
}

module.exports = Player;
