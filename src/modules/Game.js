import React, { useState } from 'react';
import GridPlayer from './GridPlayer';
import GridComputer from './GridComputer';
import playerFactory from '../factories/playerFactory';

const player = playerFactory(false);
const computer = playerFactory(true);

const Game = ({ playerCells, computerCells, playerFleet, computerFleet }) => {
  console.log(player)
  console.log(computer)
  console.log(playerFleet)
  console.log(computerFleet)

  const handleClick = (cell) => {
    if (playerTurn) {
      player.shoot(parseInt(cell.key));
      console.log(player.spotsShooted)
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

  const clickableComputerCells= computerCells.map(cell => {
    return React.cloneElement(cell, {onClick: () => handleClick(cell)}, null);
  });

  let [playerBoard, setPlayerBoard] = useState(playerCells);
  const [computerBoard, setComputerBoard] = useState(clickableComputerCells);
  let [playerTurn, setPlayerTurn] = useState(true);

  
  return (
    <div className='playground'>
      <GridPlayer playerCells={playerBoard} />
      <GridComputer computerCells={computerBoard} />
    </div>
  );
};

export default Game;