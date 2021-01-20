import React from 'react';

const InfoZone = () => {
  return (
    <div className='grid-infoZone'>
      <button className='button startGame'>A Jugar!</button>  
      <h3 className='turnDisplay'>Tu turno</h3>
      <p className='messages'></p>
    </div>
  )
};

export default InfoZone;