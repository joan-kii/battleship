import React, { useState, useEffect, useRef } from 'react';
import GridPlayer from './GridPlayer';
import GridComputer from './GridComputer';
import playerFactory from '../factories/playerFactory';
import InfoZone from './InfoZone';

const player = playerFactory(false);
const computer = playerFactory(true);

const Game = ({ playerCells, computerCells, playerGameboard, computerGameboard, startGame }) => {

  // Toggle Cells Classes

  const handleClick = (cell) => {

    if (playerTurnRef.current && !isGameOverRef.current) {
      player.shoot(parseInt(cell.key));
      computerGameboard.receiveAttack(parseInt(cell.key));
      if (cell.props.className === 'spot') {
        let missCell = React.cloneElement(cell, {className: 'miss'}, null);
        computerBoard.splice(parseInt(cell.key), 1, missCell);
        setComputerBoard([...computerBoard]);
      }  else {
        let boomCell = React.cloneElement(cell, {className: 'boom'}, null);
        computerBoard.splice(parseInt(cell.key), 1, boomCell);
        setComputerBoard([...computerBoard]);
      }
      checkWinner();
      setPlayerTurn(false);
    }
  };

  const updatePlayerGrid = (cell) => {

    playerGameboard.receiveAttack(cell);
    if (playerBoard[cell].props.className === 'spot') {
      let missCell = React.cloneElement(playerBoard[cell], {className: 'miss'}, null);
      playerBoard.splice(playerBoard[cell].key, 1, missCell);
      setPlayerBoard([...playerBoard]);
    } else {
      let boomCell = React.cloneElement(playerBoard[cell], {className: 'boom'}, null);
      playerBoard.splice(playerBoard[cell].key, 1, boomCell);
      setPlayerBoard([...playerBoard]);
    }
    checkWinner();
    setPlayerTurn(true);
  };
  
  const clickableComputerCells = computerCells.map(cell => {
    return React.cloneElement(cell, {onClick: () => handleClick(cell)}, null);
  });

  // Game Loop
  
  useEffect(() => setPlayerBoard(playerCells), [playerCells]);

  const [isGameOver, setIsGameOver] = useState(false);
  const isGameOverRef = useRef();
  isGameOverRef.current = isGameOver;

  const [playerTurn, setPlayerTurn] = useState(true);
  const playerTurnRef = useRef();
  playerTurnRef.current = playerTurn;

  const [winner, setWinner] = useState('');

  const checkWinner = () => {
    const computerLoose = computerGameboard.checkSunkenShips();
    const playerLoose = playerGameboard.checkSunkenShips();
    if (computerLoose || playerLoose) setIsGameOver(true);
    if (computerLoose) setWinner(player.name);
    if (playerLoose) setWinner(computer.name);
  };

  const [playerBoard, setPlayerBoard] = useState(playerCells);
  const [computerBoard, setComputerBoard] = useState(clickableComputerCells);

  useEffect(() => {
    if (!playerTurn && !isGameOver) {
      computer.shoot();
      const timer = setTimeout(() => {
        updatePlayerGrid(computer.spotsShooted[computer.spotsShooted.length - 1]);
      }, 600);
      return () => clearTimeout(timer);
    }
  });

  // Render

  return (
    <div className='game'>
      <h2 className='gameTitle'>Hundir la Flota</h2>
      <div className='playground'>
        <GridPlayer playerCells={playerBoard} />
        <GridComputer 
          computerCells={computerBoard}
          startGame={startGame} />
      </div>
      {startGame && 
        <InfoZone 
          playerTurn={playerTurn}
          winner={winner} />}
    </div>
  );
};

export default Game;