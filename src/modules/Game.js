import React, { useState, useEffect } from 'react';
import GridPlayer from './GridPlayer';
import GridComputer from './GridComputer';
import playerFactory from '../factories/playerFactory';

const player = playerFactory(false);
const computer = playerFactory(true);

const Game = ({ playerCells, computerCells }) => {

  const [playerBoard, setPlayerBoard] = useState(playerCells);
  const [computerBoard, setComputerBoard] = useState(computerCells);
  console.log(playerBoard)
  console.log(computerBoard)
  console.log(player)
  console.log(computer)
  
  return (
    <div className='playground'>
      <GridPlayer playerCells={playerCells} />
      <GridComputer computerCells={computerCells} />
    </div>
  );
};

export default Game;