import { movePlayer } from "./helpers";

//Se ejecuta cuando se tira el dado
export const rollDice = ({ G, random }) => {
    G.diceResult = random.D6(); //resultado de tirar el dado;
    G.currentQuestionIndex = random.D20() - 1; //índice de la pregunta a mostrar (aún no control repetidas)
    G.help = null; //borra el mensaje de respuesta correcta o incorrecta
};

//Se ejecuta cuando se responde una pregunta
export const answerQ = ({ G, ctx, playerID }, selectedOption) => {
    //si la respuesta es correcta, mueve al jugador
    if (G.questions[G.currentQuestionIndex].correct === selectedOption){
        movePlayer(G, ctx, playerID);
        G.help = 'Respuesta correcta!';
    }
    //si no, no mueve al jugador
    else
        G.help = 'Respuesta incorrecta!';
    //Borra la pregunta y el resultado del dado de la pantalla
    G.currentQuestionIndex = -1;
    G.diceResult = null;
};