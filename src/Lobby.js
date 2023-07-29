import React from 'react';
import { Lobby } from 'boardgame.io/react';

export class MyLobby extends Lobby{
    //maneja el cambio de nombre del jugador
    handleChangeName(event){
        this.setState({
            playerName: event.target.value,
        });
    }

    //maneja la creación de un nuevo juego
    //(usando la api como se pide) 
    handleNewMatch(event){
        //this._createMatch('dicegame', 2);
        fetch('http://localhost:8000/games/dicegame/create', {
            method: 'POST'})
            .then(function(response) {return response});
    }

    //actualiza la lista de juegos
    handleRefreshMatches(event){
        this._updateConnection();
    }

    //maneja el ingreso a un juego
    handleJoinMatch(event, matchID, playerID){
        this._joinMatch('dicegame', matchID, playerID);
    }

    //maneja la salida de un juego
    handleLeaveMatch(event, matchID){
        this._leaveMatch('dicegame', matchID);
    }

    //maneja el ingreso al lobby
    handleEnterLobby(event){
        this._enterLobby(this.state.playerName);
    }

    //maneja la salida del lobby
    handleExitLobby(event){
        this._exitLobby();
    }

    //maneja el inicio de un juego
    handleStartMatch(event, matchID, playerID){
        this._startMatch('dicegame', {numPlayers: 2, matchID, playerID});
    }

    //maneja la salida de un juego
    handleExitMatch(event){
        this._exitMatch();
    }

    //maneja la actualización de un juego
    render(){
        var matches_thead = [];
        var matches_th = [];

        //estilos de las columnas de la tabla
        const match_id_col_style = {
            width:"150px",
            textAlign: 'center',
            padding: '3px'
        }
        const player_name_col_style = {
            width:"150px",
            textAlign: 'center',
            padding: '3px'
        }
        const vs_col_style = {
            width:"30px",
            textAlign: 'center',
            padding: '3px'
        }
        const button_col_style = {
            width:"100px",
            textAlign: 'center',
            padding: '3px'
        }

        //creación de la tabla
        matches_th.push(<th style={match_id_col_style}>{'Match ID'}</th>);
        matches_th.push(<th style={player_name_col_style}>{'Player 1'}</th>);
        matches_th.push(<th style={vs_col_style}>{'vs.'}</th>);
        matches_th.push(<th style={player_name_col_style}>{'Player 2'}</th>);
        matches_th.push(<th style={button_col_style}><input type="button" value="New Match" onClick={(event) => this.handleNewMatch(event)}/></th>);
        matches_th.push(<th style={button_col_style}><input type="button" value="Refresh" onClick={(event) => this.handleRefreshMatches(event)}/></th>);
        matches_thead.push(<tr>{matches_th}</tr>);

        //creación de las filas de la tabla
        var matches_tbody = [];
        for (var i = 0; i !== this.connection.matches.length; i++){
            var matches_row = [];
            let match = this.connection.matches[i];

            //obtiene los nombres de los jugadores
            var player1_name = (match.players.length > 0) ? match.players[0].name:undefined;
            var player2_name = (match.players.length > 1) ? match.players[1].name:undefined;

            //crea las filas de la tabla con los nombres de los jugadores
            matches_row.push(<td style={match_id_col_style}>{match.matchID}</td>);
            if (player1_name !== undefined){
                matches_row.push(<td style={player_name_col_style}>{player1_name}</td>);
            }
            else{
                matches_row.push(<td style={player_name_col_style}><input type="button" value="Join" onClick={(event) => this.handleJoinMatch(event, match.matchID, "0")}/></td>);
            }
            matches_row.push(<td style={vs_col_style}>{'vs.'}</td>);
            if (player2_name !== undefined){
                matches_row.push(<td style={player_name_col_style}>{player2_name}</td>);
            }
            else{
                matches_row.push(<td style={player_name_col_style}><input type="button" value="Join" onClick={(event) => this.handleJoinMatch(event, match.matchID, "1")}/></td>);
            }    

            //crea los botones de inicio y salida de juego
            if (player1_name === this.state.playerName || player2_name === this.state.playerName){
                matches_row.push(<td style={button_col_style}><input type="button" value="Leave" onClick={(event) => this.handleLeaveMatch(event, match.matchID)}/></td>);
            }
            else{
                matches_row.push(<td style={button_col_style}></td>);
            }
            if((player1_name === this.state.playerName && player2_name !== undefined) || (player2_name === this.state.playerName && player1_name !== undefined)){
                let playerID = this.state.playerName === player1_name ? '0':'1';
                matches_row.push(<td style={button_col_style}><input type="button" value="Play" onClick={(event) => this.handleStartMatch(event, match.matchID, playerID)}/></td>);
            }
            else{
                matches_row.push(<td style={button_col_style}></td>);
            }
            matches_tbody.push(<tr>{matches_row}</tr>);
        }


        //estados del lobby
        if (this.state.phase === 'enter'){
            return (
                <div>
                    {'Enter name: '}
                    <input type="text" value={this.state.playerName} onChange={(event) => this.handleChangeName(event)}/>
                    <input type="button" value="Enter Lobby" onClick={(event) => this.handleEnterLobby(event)}/>
                </div>
            );
        }
        else if (this.state.phase === 'list'){
            return (
                <div>
                    <input type="button" value="Exit Lobby" onClick={(event) => this.handleExitLobby(event)}/>
                    <br></br>
                    <table id="matches">
                        <thead>
                            {matches_thead}
                        </thead>
                        <tbody>
                            {matches_tbody}
                        </tbody>
                    </table>
                </div>
            );
        }
        else if (this.state.phase === 'play'){
            var board_element = React.createElement(this.state.runningMatch.app, {
                matchID: this.state.runningMatch.matchID,
                playerID: this.state.runningMatch.playerID,
                playerName: this.state.runningMatch.playerName,
                credentials: this.state.runningMatch.credentials
            });
            return (
                <div>
                    {board_element}
                </div>
            );
        }

    }
}