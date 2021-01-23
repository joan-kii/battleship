import React, { useState } from 'react';

const PlayerZone = ({ playerGameboard }) => {

  const [isHorizontal, setIsHorizontal] = useState(true);
  const rotateShip = (container, ship) => {
    if (isHorizontal) {
      container.className = `ship ${ship}-container-vertical`;
    } else {
      container.className = `ship ${ship}-container`;
    }
    setIsHorizontal(!isHorizontal);
  }
  const shipDivs = (ship) => {
    const renderShipDivs = [];
    for(let i = 0; i < ship.shipLength; i++) {
      renderShipDivs.push(<div key={i} id={`${ship.shipName}-${i}`}></div>);
    }
    return renderShipDivs;
  };

  const playerFleet = playerGameboard.shipsArray;
  const renderPlayerFleet = playerFleet.map((ship, index) => {
    return <div 
    className={`ship ${ship.shipName}-container`} 
    key={index} 
    draggable='true'
    onDoubleClick={(e) => rotateShip(e.target.parentNode, ship.shipName)}
    >
      {shipDivs(ship)}
    </div>
  });

  return (
    <div className='grid-playerZone'>
      { renderPlayerFleet }   
      <h3>Haz doble click para girar el barco.</h3>
    </div>
  )
};

export default PlayerZone;