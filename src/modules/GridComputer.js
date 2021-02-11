import React from 'react';

const GridComputer = ({ computerCells, startGame }) => {
  const gridComputerClass = startGame ? 'grid grid-computer' : 'grid-computer-none';
  
  return (
    <div className='computerPlace'>
      {startGame && <h2 className='placeName'>Flota Enemiga</h2>}
      <div className={gridComputerClass}>
        { computerCells }
      </div>
    </div>
  )
};

export default GridComputer;