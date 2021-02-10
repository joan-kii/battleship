import React from 'react';

const InfoZone = ({ playerTurn, winner }) => {

  const messageWinner = winner === 'Ordenador' ? 
    'Has sido derrotado...' : '¡¡¡Victoria!!!';

  const message = playerTurn ? '¡Al ataque!' : '¡Cuidado!';

  return (
    <div className={'grid-infoZone'}> 
      {winner && 
        <div className='winner'>
          <h3 className='turnDisplay'>{messageWinner}</h3>
          <button className='replayButton'
            onClick={() => window.location.reload()}>Volver a jugar</button>
        </div>}
      {!winner && <p className='messages'>{message}</p>}
    </div>
  )
};

export default InfoZone;