import React from 'react';

const GridComputer = ({ computerCells, startGame }) => {
  const gridComputerClass = startGame ? 'grid grid-computer' : 'grid-computer-none';
  
  return (
    <div className={gridComputerClass}>
       { computerCells }
    </div>
  )
};

export default GridComputer;