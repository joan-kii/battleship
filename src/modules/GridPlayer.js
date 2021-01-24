import React from 'react';

const GridPlayer = ({ playerCells }) => {

  return (
    <div className='grid grid-player' >
      {playerCells}
    </div>
  )
};

export default GridPlayer;