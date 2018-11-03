const { RESULTS } = require("./constants");
const RULES = require("./rules");

const { TIE, P1, P2 } = RESULTS;

class Game {
  constructor() {
    this.maxRound = 30;
    this.currentRound = 1;
  }

  checkResult(p1, p2) {
    if (p1.action === p2.action) return TIE;
    return RULES[p1.action].includes(p2.action) ? P1 : P2;
  }

  newRound(p1, p2) {
    if (this.currentRound === this.maxRound) {
      return this.finishGame();
    }
    this.currentRound++;

    //send get request to both players and check result...
  }

  startGame() {
    //should start a new Game between p1 and p2
  }

  finishGame() {
    //should start a new game with new pair if there is any left...
  }
}

module.exports = Game;
