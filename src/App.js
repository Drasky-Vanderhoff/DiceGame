import React from "react";
//import { Client } from 'boardgame.io/react';
import { DiceGame } from './Game';
import { DiceGameBoard } from './Board';
import { MyLobby } from "./Lobby";
//import { SocketIO  } from 'boardgame.io/multiplayer'

// Define el cliente del juego
/*const DiceGameClient = Client({ 
  game: DiceGame,
  board: DiceGameBoard,
  multiplayer: SocketIO({ server: 'localhost:8000' }), 
});*/

/*class App extends React.Component {
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
}*/

// ONLINE:
const App = () => (
  <div>
    <MyLobby
    gameServer={'http://localhost:8000'}
    lobbyServer={'http://localhost:8000'}
    gameComponents={[{game: DiceGame, board: DiceGameBoard}]}
    />
  </div>
)


export default App;