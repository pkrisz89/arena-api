const {
  PAPER,
  ROCK,
  SCISSORS,
  SPOCK,
  LIZARD,
  SHIELD,
  WATERGUN
} = require("./constants");

const RULES = {
  [PAPER]: [ROCK, SPOCK, SHIELD],
  [ROCK]: [SCISSORS, LIZARD, SHIELD],
  [SCISSORS]: [PAPER, LIZARD, SHIELD],
  [SPOCK]: [SCISSORS, ROCK, SHIELD],
  [LIZARD]: [SPOCK, PAPER, SHIELD],
  [WATERGUN]: [PAPER, ROCK, SCISSORS, SPOCK, LIZARD],
  [SHIELD]: [WATERGUN]
};

const checkResult = (p1, p2) => {
  if (p1.action === p2.action) return "TIE";
  return RULES[p1.action].includes(p2.action) ? "P1" : "P2";
};
