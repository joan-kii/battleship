import React from 'react';

const shipDivs = (ship) => {
  const renderShipDivs = [];
  for(let i = 0; i < ship.shipLength; i++) {
    renderShipDivs.push(<div key={i} id={`${ship.shipName}-${i}`}></div>);
  }
  return renderShipDivs;
};

const PlayerZone = ({ playerGameboard }) => {

  const playerFleet = playerGameboard.shipsArray;
  const renderPlayerFleet = playerFleet.map((ship, index) => {
    return <div className={`ship ${ship.shipName}-container`} key={index} draggable='true'>
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