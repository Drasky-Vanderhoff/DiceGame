import React from "react";
import { DiceGame } from './Game';
import { DiceGameBoard } from './Board';
import { MyLobby } from "./Lobby";

const { protocol, hostname, port } = window.location;
const server = `${protocol}//${hostname}/.netlify/functions/game_server`;

const App = () => (
  <MyLobby
    gameServer={server}
    lobbyServer={server}
    gameComponents={[{ game: DiceGame, board: DiceGameBoard }]}
  />
);


export default App;