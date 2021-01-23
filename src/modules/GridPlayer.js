import React from 'react';

const createGrid = (playerShipsPositions) => {
  const playerCells = [];

  for(let i = 0; i < 100; i++) {
    playerCells.push(<div key={i}></div>);
  }

  for (let ship of playerShipsPositions) {
    for (let cell of ship.positions) {
      playerCells[cell] = <div key={cell} className={ship.ship}></div>;
    }
  }
  return playerCells;
};

const GridPlayer = ({ playerGameboard }) => {
  const playerFleet = playerGameboard.shipsArray;
  const playerShipsPositions = [];
  
  for (let ship of playerFleet) {
    playerShipsPositions.push({
      ship: ship.shipName, 
      positions: ship.shipPosition
    });
  }

  return (
    <div className='grid grid-player' >
      { createGrid(playerShipsPositions) }
    </div>
  )
};

export default GridPlayer;