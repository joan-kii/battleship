import React from 'react';

const createGrid = () => {
  const playerCells = [];

  for(let i = 0; i < 100; i++) {
    playerCells.push(<div key={i}></div>);
  }
  return playerCells;
};

const GridPlayer = () => {

  return (
    <div className='grid grid-player' >
      { createGrid() }
    </div>
  )
};

export default GridPlayer;