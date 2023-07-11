import React from "react";
import { render } from "react-dom";
import { Client } from 'boardgame.io/react';
import { DiceGame } from './Game';
import { DiceGameBoard } from './Board';
import { SocketIO  } from 'boardgame.io/multiplayer'

// Define el cliente del juego
const DiceGameClient = Client({ 
  game: DiceGame,
  board: DiceGameBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }), 
});

class App extends React.Component {
  state = { playerID: null };
  // Define lo que se muestra al ir a la página
  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Player 0
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Player 1
          </button>
        </div>
      );
    }
    return (
      <div>
        <DiceGameClient playerID={this.state.playerID} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));


export default App;