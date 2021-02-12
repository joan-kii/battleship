import React from 'react';

const PlayerZone = ({ renderPlayerFleet, shipAlreadyPlaced, setStartGame }) => {
  const rotateMessage = <h3 className='rotateMessage'>Haz doble click para girar el barco</h3>;
  const readyMessage = 
    <div className='readyMessage'>
      <h3>¡A Jugar!</h3>
      <button 
        className='button startGame'
        onClick={() => setStartGame(true)}>Comenzar</button>
    </div>;

  return (
    <div className='grid-playerZone'>
      <div>
        { renderPlayerFleet } 
      </div>
      { shipAlreadyPlaced ? readyMessage : rotateMessage } 
    </div>
  )
};

export default PlayerZone;