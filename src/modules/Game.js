import React, { useState, useEffect } from 'react';
import GridPlayer from './GridPlayer';
import GridComputer from './GridComputer';
import playerFactory from '../factories/playerFactory';

const player = playerFactory(false);
const computer = playerFactory(true);

const Game = ({ playerCells, computerCells }) => {

  const handleClick = (e) => {
    console.log(e)
  }

  computerCells.forEach(cell => {
    cell = React.cloneElement(cell, {onClick: (e) => handleClick(e)}, null);
  })

  console.log(computerCells)

  const [playerBoard, setPlayerBoard] = useState(playerCells);
  const [computerBoard, setComputerBoard] = useState(computerCells);
  
  return (
    <div className='playground'>
      <GridPlayer playerCells={playerBoard} />
      <GridComputer computerCells={computerBoard} />
    </div>
  );
};

export default Game;