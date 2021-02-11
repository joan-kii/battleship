import React from 'react';

const GridPlayer = ({ playerCells }) => {
  return (
    <div className='playerPlace'>
      <h2 className='placeName'>Tu Flota</h2>
      <div className='grid grid-player' >
        {playerCells}
      </div>
    </div>
  )
};

export default GridPlayer;