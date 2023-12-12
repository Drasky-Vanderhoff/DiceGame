import React from "react";
import { DiceGame } from './Game';
import { DiceGameBoard } from './Board';
import { MyLobby } from "./Lobby";

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