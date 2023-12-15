const { Server, Origins } = require('boardgame.io/server');
const { DiceGame } = require('../../src/Game');

const handler = async (event) => Server({
  games: [DiceGame],
  origins: [Origins.LOCALHOST],
}).run(process.env.PORT || 3333);


module.exports = { handler }
