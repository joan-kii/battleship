import React, { useState, useEffect } from 'react';
import GridPlayer from './GridPlayer';
import GridComputer from './GridComputer';
import playerFactory from '../factories/playerFactory';
import InfoZone from './InfoZone';

const player = playerFactory(false);
const computer = playerFactory(true);

const Game = ({ playerCells, computerCells, playerFleet, computerFleet, startGame }) => {
  /* console.log(player) */
  /* console.log(computer) */
  /* console.log(playerFleet) */
  /* console.log(computerFleet) */

  const handleClick = (cell) => {
    if (playerTurn) {
      player.shoot(parseInt(cell.key));
      if (cell.props.className === 'spot') {
        let missCell = React.cloneElement(cell, {className: 'miss'}, null);
        computerBoard.splice(cell.key, 1, missCell);
        setComputerBoard([...computerBoard]);
      } else {
        let boomCell = React.cloneElement(cell, {className: 'boom'}, null);
        computerBoard.splice(cell.key, 1, boomCell);
        setComputerBoard([...computerBoard]);
      }
      setPlayerTurn(playerTurn = false);
    }
  };

  const clickableComputerCells = computerCells.map(cell => {
    return React.cloneElement(cell, {onClick: () => handleClick(cell)}, null);
  });

  const updatePlayerGrid = (cell) => {
    if (playerBoard[cell].props.className === 'spot') {
      let missCell = React.cloneElement(playerBoard[cell], {className: 'miss'}, null);
      playerBoard.splice(playerBoard[cell].key, 1, missCell);
      setPlayerBoard([...playerBoard]);
    } else {
      let boomCell = React.cloneElement(playerBoard[cell], {className: 'boom'}, null);
      playerBoard.splice(playerBoard[cell].key, 1, boomCell);
      setPlayerBoard([...playerBoard]);
    }
    setPlayerTurn(true)
  };

  useEffect(() => setPlayerBoard(playerCells), [playerCells]);
  const [playerBoard, setPlayerBoard] = useState(playerCells);
  const [computerBoard, setComputerBoard] = useState(clickableComputerCells);
  let [playerTurn, setPlayerTurn] = useState(true);
  
  useEffect(() => {
    if (!playerTurn) {
      computer.shoot();
      updatePlayerGrid(computer.spotsShooted[computer.spotsShooted.length - 1]);
    }
  })

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