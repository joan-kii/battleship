import React from 'react';

const InfoZone = ({ playerTurn }) => {
  const message = playerTurn ? '¡Al ataque!' : '¡Cuidado!';
  return (
    <div className={'grid-infoZone'}> 
      <h3 className='turnDisplay'>{message}</h3>
      <p className='messages'></p>
    </div>
  )
};

export default InfoZone;