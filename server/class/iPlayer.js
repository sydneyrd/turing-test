class IPlayer {
    constructor(name, isAI = false) {
      this.name = name;
      this.isAI = isAI;
    }
  
    getName() {
      return this.name;
    }
  
    isAIPlayer() {
      return this.isAI;
    }
  }
  
  module.exports = IPlayer;
  