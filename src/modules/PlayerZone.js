import React, { useState } from 'react';

const shipDivs = (ship) => {
  const renderShipDivs = [];
  for(let i = 0; i < ship.shipLength; i++) {
    renderShipDivs.push(<div key={i} id={`${ship.shipName}-${i}`}></div>);
  }
  return renderShipDivs;
};

const PlayerZone = ({ playerGameboard }) => {
const [isHorizontal, setIsHorizontal] = useState(true);
const rotateShip = () => {
  setIsHorizontal(!isHorizontal);
}

  const playerFleet = playerGameboard.shipsArray;
  const renderPlayerFleet = playerFleet.map((ship, index) => {
    return <div 
      className={isHorizontal ? `ship ${ship.shipName}-container` : `ship ${ship.shipName}-container-vertical`} 
      key={index} 
      draggable='true'
      onDoubleClick={() => rotateShip()}
      >
      {shipDivs(ship)}
    </div>
  });

  return (
    <div className='grid-playerZone'>
      { renderPlayerFleet }   
      <button className='button rotateShips'>Girar Barcos</button>
    </div>
  )
};

export default PlayerZone;