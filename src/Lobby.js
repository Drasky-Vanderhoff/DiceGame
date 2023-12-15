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
        fetch(`${this.props.lobbyServer}/games/dicegame/create`, {
          method: "POST",
        }).then(function (response) {
          return response;
        });
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

        //creación de la tabla
        matches_th.push(<th className='idCol'>{'Partida'}</th>);
        matches_th.push(<th className='playerCol'>{'Jugador 1'}</th>);
        matches_th.push(<th className='vsCol'>{'vs.'}</th>);
        matches_th.push(<th className='playerCol'>{'Jugador 2'}</th>);
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
            matches_row.push(<td className='idCol'>{match.matchID}</td>);
            if (player1_name !== undefined){
                matches_row.push(<td className='playerCol'>{player1_name}</td>);
            }
            else{
                matches_row.push(<td className='playerCol'><input className="button2"  type="button" value="Unirse" onClick={(event) => this.handleJoinMatch(event, match.matchID, "0")}/></td>);
            }
            matches_row.push(<td className='vsCol'>{'vs.'}</td>);
            if (player2_name !== undefined){
                matches_row.push(<td className='playerCol'>{player2_name}</td>);
            }
            else{
                matches_row.push(<td className='playerCol'><input className="button2" type="button" value="Unirse" onClick={(event) => this.handleJoinMatch(event, match.matchID, "1")}/></td>);
            }    

            //crea los botones de inicio y salida de juego
            if (player1_name === this.state.playerName || player2_name === this.state.playerName){
                matches_row.push(<td className='buttonCol'><input className="button1" type="button" value="Salir" onClick={(event) => this.handleLeaveMatch(event, match.matchID)}/></td>);
            }
            else{
                matches_row.push(<td className='buttonCol'></td>);
            }
            if((player1_name === this.state.playerName && player2_name !== undefined) || (player2_name === this.state.playerName && player1_name !== undefined)){
                let playerID = this.state.playerName === player1_name ? '0':'1';
                matches_row.push(<td sclassName='buttonCol'><input className="button1" type="button" value="Jugar" onClick={(event) => this.handleStartMatch(event, match.matchID, playerID)}/></td>);
            }
            else{
                matches_row.push(<td className='buttonCol'></td>);
            }
            matches_tbody.push(<tr>{matches_row}</tr>);
        }


        //estados del lobby
        if (this.state.phase === 'enter'){
            return (
                <div>
                    <div>
                        <h1>Preguntas de Inglés</h1>
                        <div className='enterLobby'>
                            {'Tu nombre: '}
                            <input type="text" value={this.state.playerName} onChange={(event) => this.handleChangeName(event)}/>
                            <input className="button1" type="button" value="Entrar al Lobby" onClick={(event) => this.handleEnterLobby(event)}/>
                        </div>
                    </div>
                    <div className="enterLobby">
                        <h2>¿Cómo Empezar?</h2>
                        <p>Ingresa tu nombre y presiona "Entrar al Lobby".</p>
                    </div>
                </div>
            );
        }
        else if (this.state.phase === 'list'){
            return (
                <div className='row'>
                    <h1>Preguntas de Inglés</h1>
                    <div className='buttons'>
                        <input className='button1' type="button" value="🡸 Salir del Lobby" onClick={(event) => this.handleExitLobby(event)}/>
                        <input className='button1' type="button" value="Nuevo Juego" onClick={(event) => this.handleNewMatch(event)}/>
                    </div>
                    <div className='listLobby'>
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
                    <div className="listLobby instruction">
                        <h2>¿Cómo entrar a una partida?</h2>
                        <p>Puedes sumarte a una partida existente presionando "Unirse". </p>
                        <p>Cuando la partida tenga 2 jugadores podrás comenzar el juego presionando "Jugar".</p>
                        <p>Para salir de la partida puedes presionar "Salir"</p>
                        <p>Si quieres crear una partida nueva puedes presionar "Nuevo Juego".</p>
                        <p>Para salir del lobby puedes presionar "Salir del Lobby".</p>
                    </div>
                </div>
            );
        }
        else if (this.state.phase === 'play'){
            var board_element = React.createElement(this.state.runningMatch.app, {
                matchID: this.state.runningMatch.matchID,
                playerID: this.state.runningMatch.playerID,
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