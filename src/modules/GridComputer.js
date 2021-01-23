import React from 'react';

const createGrid = (computerShipsPositions) => {
  const computerCells = [];

  for(let i = 0; i < 100; i++) {
    computerCells.push(<div key={i}></div>);
  }

  for (let ship of computerShipsPositions) {
    for (let cell of ship.positions) {
      computerCells[cell] = <div key={cell} className={ship.ship}></div>;
    }
  }
  return computerCells;
};

const GridComputer = ({ computerGameboard }) => {
  const computerFleet = computerGameboard.shipsArray;
  const computerShipsPositions = [];

  for (let ship of computerFleet) {
    computerShipsPositions.push({
      ship: ship.shipName, 
      positions: ship.shipPosition
    });
  }
  
  return (
    <div className='grid grid-computer'>
      { createGrid(computerShipsPositions) }  
    </div>
  )
};

export default GridComputer;