

// Devuelve true si hay un jugador en la última celda del tablero
export function IsVictory(cells) {
      return cells[24] !== null;
};

//mueve al jugador tantos casilleros como haya indicado el dado
export function movePlayer(G, ctx, playerID){
  let actualPosition = G.players[ctx.currentPlayer].position
  G.cells[actualPosition] = null; //dejo libre la celda donde estaba el jugador
  
  //le doy una nueva posición que no supere el máximo
  let newPosition = Math.min(actualPosition += G.diceResult, 24);
  G.players[ctx.currentPlayer].position = newPosition;
  
  if (G.cells[newPosition] !== null) //si la celda estaba ocupada, el que estaba vuelve a 0
    G.players[G.cells[newPosition]].position = 0;
  G.cells[newPosition] = playerID; //ocupo la celda con el jugador actual
}
