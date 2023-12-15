import { rollDice, answerQ } from "./moves";
import { IsComplete, IsVictory } from "./helpers";
const questionsData = [
  {
    q: "¿Cómo se escribe MANZANA en inglés?",
    option1: "Pear",
    option2: "Apple",
    option3: "Strawberry",
    correct: "2",
  },
  {
    q: "¿Cómo se escribe CASA en inglés?",
    option1: "Door",
    option2: "House",
    option3: "Mouse",
    correct: "2",
  },
  {
    q: "¿Cómo se escribe RATÓN en inglés?",
    option1: "Dog",
    option2: "Goose",
    option3: "Mouse",
    correct: "3",
  },
  {
    q: "¿Cómo se escribe MANTECA en inglés?",
    option1: "Butter",
    option2: "Bread",
    option3: "Orange",
    correct: "1",
  },
  {
    q: "¿Cómo se escribe ROJO en inglés?",
    option1: "Red",
    option2: "Black",
    option3: "Blue",
    correct: "1",
  },
  {
    q: "¿Cómo se escribe NARIZ en inglés?",
    option1: "Eye",
    option2: "Hand",
    option3: "Nose",
    correct: "3",
  },
  {
    q: "¿Cómo se escribe GATO en inglés?",
    option1: "Mouse",
    option2: "Cat",
    option3: "Dog",
    correct: "2",
  },
  {
    q: "¿Cómo se escribe AZUL en inglés?",
    option1: "White",
    option2: "Blue",
    option3: "Green",
    correct: "2",
  },
  {
    q: "¿Cómo se escribe CUCHARA en inglés?",
    option1: "Spoon",
    option2: "Fork",
    option3: "Knife",
    correct: "1",
  },
  {
    q: "¿Cómo se escribe ARAÑA en inglés?",
    option1: "Frog",
    option2: "Beetle",
    option3: "Spider",
    correct: "3",
  },
  {
    q: "¿Qué significa SEVEN en español?",
    option1: "Vista",
    option2: "Gaseosa",
    option3: "Siete",
    correct: "3",
  },
  {
    q: "¿Qué significa FISH en español?",
    option1: "Pez",
    option2: "León",
    option3: "Elefante",
    correct: "1",
  },
  {
    q: "¿Qué significa SMILE en español?",
    option1: "Cámara",
    option2: "Ratón",
    option3: "Sonrisa",
    correct: "3",
  },
  {
    q: "¿Qué significa CAT en español?",
    option1: "Tractor",
    option2: "Gato",
    option3: "Sol",
    correct: "2",
  },
  {
    q: "¿Qué significa DOG en español?",
    option1: "Flor",
    option2: "León",
    option3: "Perro",
    correct: "3",
  },
  {
    q: "¿Qué significa BOOK en español?",
    option1: "Pelota",
    option2: "Libro",
    option3: "Puerta",
    correct: "2",
  },
  {
    q: "¿Qué significa PURPLE en español?",
    option1: "Rosa",
    option2: "Azul",
    option3: "Violeta",
    correct: "3",
  },
  {
    q: "¿Qué significa PENCIL en español?",
    option1: "Sol",
    option2: "Lápiz",
    option3: "Árbol",
    correct: "2",
  },
  {
    q: "¿Qué significa DOOR en español?",
    option1: "Casa",
    option2: "Ventana",
    option3: "Puerta",
    correct: "3",
  },
  {
    q: "¿Qué significa MOUSE en español?",
    option1: "Plátano",
    option2: "Ratón",
    option3: "Flor",
    correct: "2",
  },
];

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
    playedQuestions: Array(20).fill(false), // Preguntas ya jugadas
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
    if (IsComplete(G)) {
      return { complete: true };
    }
  },
}
