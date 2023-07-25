const { Server, Origins } = require('boardgame.io/server');
const { DiceGame } = require('./Game');

const server = Server({ 
  games: [DiceGame],
  origins: [Origins.LOCALHOST] 
});

server.run(8000);