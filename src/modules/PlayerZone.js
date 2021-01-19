import React from 'react';
import gameboardFactory from '../factories/gameboardFactory';

const shipDivs = (ship) => {
  for(let i = 0; i < ship.shipLength; i++) {
    <div key={i}></div>
  }
};

const PlayerZone = () => {

  const playerFleet = gameboardFactory().shipsArray;
  const renderPlayerFleet = playerFleet.map((ship, index) => {
    return <div className={`ship ${ship.shipName}-container`} key={index} draggable='true'>
      {shipDivs(ship)}
    </div>
  });

  return (
    <div className='grid-playerZone'>
      { renderPlayerFleet }   
    </div>
  )
};

export default PlayerZone;