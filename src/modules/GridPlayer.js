import React from 'react';

const playerCells = [];

const createGrid = () => {
  for(let i = 0; i < 100; i++) {
    playerCells.push(<div key={i}></div>);
  }
};

const GridPlayer = ({ playerGameboard }) => {
  console.log(playerGameboard)

  return (
    <div className='grid grid-player' >
      { playerCells }
    </div>
  )
};

createGrid();

export default GridPlayer;