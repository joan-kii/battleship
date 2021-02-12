import React from 'react';

const GridPlayer = ({ playerCells, startGame }) => {

  const playerGridTitle = startGame ? 'Tu Flota': 'Posiciona tus Barcos';
  return (
    <div className='playerPlace'>
      <h2 className='placeName'>{playerGridTitle}</h2>
      <div className='grid' >
        {playerCells}
      </div>
    </div>
  )
};

export default GridPlayer;