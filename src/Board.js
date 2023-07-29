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
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined && (
        <div id="winner">Ganador: {matchData[ctx.gameover.winner].name}</div>
      )
  }

  //crea el tablero
  let tbody = [];
  for (let i = 0; i < 5; i++) {
    let cells = [];
    for (let j = 0; j < 5; j++) {
      const id = 5 * i + j;
      cells.push(
        <td key={id}>
          {G.cells[id]?
            <div className="playerName">{G.cells[id]}</div>
            : (id === 0? <div className="cell">Salida</div> 
            : (id === 24? <div className="cell">Llegada</div>
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
      <input type="radio" value='1' name="option" checked={selectedOption === '1'} onChange={handleOptionChange}/>
      <label for="op1">{currentQuestion.option1}</label><br/>
      <input type="radio" value='2' name="option" checked={selectedOption === '2'} onChange={handleOptionChange} />
      <label for="op2">{currentQuestion.option2}</label><br/>
      <input type="radio" value='3' name="option" checked={selectedOption === '3'} onChange={handleOptionChange} />
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
        <div className='col boardText'>
          <p><button className='button1' onClick={() => onClickDice()}>Tirar el dado</button>  resultado: {G.diceResult}</p>
          {question}
          <p>Turno de {currentPlayerName}</p>
          <p>{G.help}</p>
          {winner}
        </div>
      </div>
    </div>
  );
}