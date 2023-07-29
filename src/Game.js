import { rollDice, answerQ } from "./moves";
import { IsVictory } from "./helpers";
import questionsData from './questions.json';

// Define el juego
export const DiceGame = {

  name: 'dicegame', // Nombre del juego

  // Configura el inicio del juego
  setup: (ctx, matchData) => ({ 
    // Celdas del tablero
    cells: Array(25).fill(null),
    // Posición de los jugadores
    players: {
      '0': { position: 0 },
      '1': { position: 0 }, 
    }, 
    diceResult: null, // Resultado del dado
    questions: questionsData, // Cargar las preguntas desde el archivo JSON
    currentQuestionIndex: -1, // Índice de la pregunta actual (-1 indica que no se muestra ninguna pregunta)
    help: null, //mensaje de respuesta correcta o incorrecta
  }),

  // Define el número de jugadores
  minPlayers: 2,
  maxPlayers: 2,

  // Define los movimientos permitidos al inicio del turno
  moves: { rollDice },

  // Define las etapas de un turno 
  turn: {
    onMove: (ctx) => {ctx.events.setStage('QStage')}, // Cambia a la etapa de preguntas despues de tirar el dado
    stages: {
      QStage: {
        moves: { answerQ }, // Define los movimientos permitidos en la etapa de preguntas
      },
    },
    maxMoves: 2, // Define la cantidad de movimientos permitidos por turno
  },

  // Define las condiciones de fin del juego
  endIf: ({ G, ctx }) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer }; // Retorna el jugador ganador
    }
  },
}
