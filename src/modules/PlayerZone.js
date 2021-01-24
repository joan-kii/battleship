import React from 'react';

const PlayerZone = ({ playerGameboard }) => {

  const rotateShip = (container, ship) => {
    if (ship.isHorizontal) {
      container.className = `ship ${ship.shipName}-container-vertical`;
    } else {
      container.className = `ship ${ship.shipName}-container`;
    }
    ship.isHorizontal = !ship.isHorizontal;
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
    ship.isHorizontal = true;
    return <div 
    className={`ship ${ship.shipName}-container`} 
    key={index} 
    draggable='true'
    onDoubleClick={(e) => rotateShip(e.target.parentNode, ship)}
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