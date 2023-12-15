const { Server, Origins } = require('boardgame.io/server');
const { DiceGame } = require('../src/Game');

const server = Server({ 
  games: [DiceGame],
  origins: [Origins.LOCALHOST]
});

server.run(process.env.PORT || 3333);