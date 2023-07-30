

// Devuelve true si hay un jugador en la última celda del tablero
export function IsVictory(cells) {
      return cells[29] !== null;
};

//mueve al jugador tantos casilleros como haya indicado el dado
export function movePlayer(G, ctx, currentPlayername){
  let actualPosition = G.players[ctx.currentPlayer].position
  G.cells[actualPosition] = null; //dejo libre la celda donde estaba el jugador
  
  //le doy una nueva posición que no supere el máximo
  let newPosition = Math.min(actualPosition += G.diceResult, 29);
  G.players[ctx.currentPlayer].position = newPosition;
  
  if (G.cells[newPosition] !== null) //si la celda estaba ocupada, el que estaba vuelve a 0
    //para eso me fijo cual es el jugador actual y muevo al otro
    ctx.currentPlayer === 0? G.players[1].position = 0 : G.players[1].position = 0;
  G.cells[newPosition] = currentPlayername; //ocupo la celda con el jugador actual
}

//Busca un apregunta que no se haya jugado
export function getQuestion(G, random){
  let index = random.D20() - 1;
  while (G.playedQuestions[index]) //busca una pregunta que no haya sido jugada
      index = index === 19? 0 : index + 1;
  G.currentQuestionIndex = index;
  G.playedQuestions[index] = true;
  G.help = null; //borra el mensaje de respuesta correcta o incorrecta
}