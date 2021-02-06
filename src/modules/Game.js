import React, { useState, useEffect } from 'react';
import GridPlayer from './GridPlayer';
import GridComputer from './GridComputer';
import playerFactory from '../factories/playerFactory';
import InfoZone from './InfoZone';

const player = playerFactory(false);
const computer = playerFactory(true);

const Game = ({ playerCells, computerCells, playerGameboard, computerGameboard, startGame }) => {
  /* console.log('player', playerGameboard)
  console.log('computer', computerGameboard) */

  // Toggle Cells Classes

  const handleClick = (cell) => {
    console.log('handleClick', isGameOver)

    if (playerTurn) {
      player.shoot(parseInt(cell.key));
      computerGameboard.receiveAttack(parseInt(cell.key));
      if (cell.props.className === 'spot') {
        let missCell = React.cloneElement(cell, {className: 'miss'}, null);
        computerBoard.splice(cell.key, 1, missCell);
        setComputerBoard([...computerBoard]);
      } else {
        let boomCell = React.cloneElement(cell, {className: 'boom'}, null);
        computerBoard.splice(cell.key, 1, boomCell);
        setComputerBoard([...computerBoard]);
      }
      setPlayerTurn(false);
    }
    setIsGameOver(computerGameboard.checkSunkenShips());
  };

  const clickableComputerCells = computerCells.map(cell => {
    return React.cloneElement(cell, {onClick: () => handleClick(cell)}, null);
  });

  const updatePlayerGrid = (cell) => {
    console.log('updatePlayer', isGameOver)
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
    setIsGameOver(playerGameboard.checkSunkenShips());
    setPlayerTurn(true);
  };

  // Game Loop
  
  useEffect(() => setPlayerBoard(playerCells), [playerCells]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerBoard, setPlayerBoard] = useState(playerCells);
  const [computerBoard, setComputerBoard] = useState(clickableComputerCells);
  const [playerTurn, setPlayerTurn] = useState(true);
  
  useEffect(() => {
    if (!playerTurn && !isGameOver) {
      computer.shoot();
      const timer = setTimeout(() => {
        updatePlayerGrid(computer.spotsShooted[computer.spotsShooted.length - 1]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  // Render

  return (
    <div>
      <div className='playground'>
        <GridPlayer playerCells={playerBoard} />
        <GridComputer 
          computerCells={computerBoard}
          startGame={startGame} />
      </div>
      {startGame && <InfoZone playerTurn={playerTurn} />}
    </div>
  );
};

export default Game;