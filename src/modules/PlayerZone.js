import React from 'react';

const PlayerZone = ({ renderPlayerFleet, shipAlreadyPlaced, startGame }) => {

  const rotateMessage = <h3>Haz doble click para girar el barco.</h3>;
  const readyMessage = 
    <div>
    <h3>A Jugar!</h3>
    <button 
      className='button startGame'
      onClick={startGame}>Comenzar</button>
    </div>;

  return (
    <div className='grid-playerZone'>
      { renderPlayerFleet } 
      { shipAlreadyPlaced ? readyMessage : rotateMessage } 
    </div>
  )
};

export default PlayerZone;