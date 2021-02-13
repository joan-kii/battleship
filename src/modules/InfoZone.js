import React from 'react';

const InfoZone = ({ playerTurn, winner }) => {

  const messageWinner = winner === 'Ordenador' ? 
    'Has sido derrotado...' : '¡¡¡Victoria!!!';

  const playerMessages = ['¡Vamos!', '¡Al ataque!', '¡Sí!', '¡Dispara!', 'Tu turno', '¡A por ellos!'];
  const computerMessages = ['¡Atención!', '¡Te atacan!', '¡Cuidado!', '¡Oh, no!', '¡Resiste!', '¡No te rindas!'];

  const message = playerTurn ? playerMessages[Math.floor(Math.random() * playerMessages.length)] : 
    computerMessages[Math.floor(Math.random() * computerMessages.length)];

  return (
    <div className='grid-infoZone'> 
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