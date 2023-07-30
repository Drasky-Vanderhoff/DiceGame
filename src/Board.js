import React, { useState } from 'react';

export function DiceGameBoard({ ctx, G, moves, matchData }) {
  const [selectedOption, setSelectedOption] = useState('');

  //llama a la función rollDice del archivo moves.js
  const onClickDice = () => moves.rollDice();
  const currentQuestion = G.currentQuestionIndex >= 0 ? G.questions[G.currentQuestionIndex] : '';

  //obtiene el nombre del jugador actual
  const currentPlayerName = matchData[ctx.currentPlayer].name;

  
  //si hay un ganador, muestra el mensaje
  let winner = '';
  let complete = false;
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined && (
        <div id="winner">Ganador: {matchData[ctx.gameover.winner].name}</div>
      )
    complete = 
      ctx.gameover.complete === true && (
        <div id="complete">¡Emplate!</div>
      )
  }

  //crea el tablero
  let tbody = [];
  for (let i = 0; i < 6; i++) {
    let cells = [];
    for (let j = 0; j < 5; j++) {
      const id = 5 * i + j;
      cells.push(
        <td key={id}>
          {G.cells[id]?
            <div className="playerName">{G.cells[id]}</div>
            : (id === 0? <div className="cell">Salida</div> 
            : (id === 29? <div className="cell">Llegada</div>
            : <div className="cell">{id}</div>
          ))}
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  //maneja el cambio de opción
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //maneja el submit de la respuesta
  const handleSubmit = (event) => {
    event.preventDefault();
    moves.answerQ(event.target.value, currentPlayerName);
    setSelectedOption('');
  };

  //crea las opciones de la pregunta actual
  let myOptions = (
    <div>
      <input id="op1" type="radio" value='1' name="option" checked={selectedOption === '1'} onChange={handleOptionChange}/>
      <label for="op1">{currentQuestion.option1}</label><br/>
      <input id="op2" type="radio" value='2' name="option" checked={selectedOption === '2'} onChange={handleOptionChange} />
      <label for="op2">{currentQuestion.option2}</label><br/>
      <input id="op3" type="radio" value='3' name="option" checked={selectedOption === '3'} onChange={handleOptionChange} />
      <label for="op3">{currentQuestion.option3}</label><br/><br/>
    </div>
  )

  //crea la pregunta actual
  let question = (
    <div>
      <p>Pregunta: {currentQuestion.q}</p> 
      {G.currentQuestionIndex !== -1 && myOptions}
      <p><button className='button1' value={selectedOption} onClick={handleSubmit}>Responder pregunta</button></p>
    </div>
  )

  //devuelve toda la página que ve el jugador
  return (
    <div className='container'>
      <h1>Preguntas de Inglés</h1>
      <div className='row'>
        <div className='col'>
          <table id="board">
            <tbody>{tbody}</tbody>
          </table> 
        </div> 
        <div className='col'>
          <div className='boardText'>
            <p><button className='button1' onClick={() => onClickDice()}>Tirar el dado</button>  resultado: {G.diceResult}</p>
            {question}
            <p>Turno de {currentPlayerName}</p>
            <p>{G.help}</p>
            {winner}
            {complete}
          </div>
          <div className="help">
              <h2>¿Cómo jugar?</h2>
              <p>
                Los jugadores inician el juego en la casilla "Salida".<br/>
                Durante su turno cada jugador debe tirar el dado y responder la pregunta que se le presenta.<br/>
                Si la respuesta es correcta, el jugador avanza el número de casillas indicado por el dado.<br/>
                Si la respuesta es incorrecta, el jugador no avanza.<br/>
                Si el jugador cae en una casilla ocupada por otro jugador, el que estaba en la casilla vuelve al punto de salida.<br/> 
                El juego termina cuando un jugador llega a la casilla "Llegada".<br/>
                Si se respondieron todas las preguntas y nungún jugador llegó a la última casilla el juego termina en empate.
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}