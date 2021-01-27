import React from 'react';

const PlayerZone = ({ renderPlayerFleet }) => {

  return (
    <div className='grid-playerZone'>
      { renderPlayerFleet } 
      <h3>Haz doble click para girar el barco.</h3>
    </div>
  )
};

export default PlayerZone;