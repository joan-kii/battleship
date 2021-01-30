import React, { useState } from 'react';
import GridPlayer from './modules/GridPlayer';
import GridComputer from './modules/GridComputer';
import PlayerZone from './modules/PlayerZone';
import InfoZone from './modules/InfoZone';
import Footer from './modules/Footer';
import gameboardFactory from './factories/gameboardFactory';

const playerGameboard = gameboardFactory();
const computerGameboard = gameboardFactory();

// Place Computer Fleet

const computerTakenSpots = [];

const deployNavy = (navy, ship, takenSpots) => {
  let randomDirection = Math.random() < 0.5;
  let shipSpots = [];
  let direction = randomDirection ? 10 : 1;
  let randomStart = Math.abs(Math.floor(Math.random() * (100 - (direction * ship.shipLength))));

  for (let i = 0; i < ship.shipLength; i++) {
    if(!randomDirection) {
      shipSpots.push(randomStart + (i * 10));
    } else {
      shipSpots.push(randomStart + i);
    }
  }

  const isTaken = shipSpots.some(index => takenSpots.includes(index));
  const sliceShipSpotsRight = shipSpots.slice(0, ship.shipLength - 1);
  const sliceShipSpotsLeft = shipSpots.slice(1, ship.shipLength);
  const isAtRightEdge = sliceShipSpotsRight.some(index => index % 10 === 9);
  const isAtLeftEdge = sliceShipSpotsLeft.some(index => index % 10 === 0);
  const isAtBottomEdge = shipSpots.some(index => index > 99);
  
  if (!isTaken && !isAtRightEdge && !isAtLeftEdge && !isAtBottomEdge) {
    shipSpots.forEach(index => takenSpots.push(index));
    return navy.placeShip(ship, shipSpots[0], randomDirection);
  } else {
    deployNavy(navy, ship, takenSpots); 
  }
};

for (let ship of computerGameboard.shipsArray) {
  deployNavy(computerGameboard, ship, computerTakenSpots);
}

// Place Player Zone Fleet

const playerFleet = playerGameboard.shipsArray;

const shipDivs = (ship) => {
  const renderShipDivs = [];
  for(let i = 0; i < ship.shipLength; i++) {
    renderShipDivs.push(<div key={i} id={`${ship.shipName}-${i}`}></div>);
    ship.lastIdDiv = i;
  }
  return renderShipDivs;
};

const rotateShip = (container, ship) => {
  if (ship.isHorizontal) {
    container.className = `ship ${ship.shipName}-container-vertical`;
  } else {
    container.className = `ship ${ship.shipName}-container`;
  }
  ship.isHorizontal = !ship.isHorizontal;
};

const renderPlayerFleet = playerFleet.map((ship, index) => {
  ship.isHorizontal = true;
  ship.lastIdDiv = 0;
  return <div 
    key={index}
    id={ship.shipName}
    className={`ship ${ship.shipName}-container`} 
    draggable='true'
    onDoubleClick={(e) => rotateShip(e.target.parentNode, ship)}
    onMouseDown={(e) => handleMouseDown(e)}
    onDragStart={(e) => dragStart(e, ship)}
    onDragEnd={(e) => dragEnd(e)}>
    {shipDivs(ship)}
  </div>
});

// Drag and Drop Player Fleet

let selectedShip;
let selectedShipElement;
let draggedShip;
let draggedShipLength;


const handleMouseDown = (e) => {
  selectedShipElement = e.target.id;
  selectedShipElement = parseInt(selectedShipElement.substr(-1));
};

const dragStart = (e, ship) => {
  selectedShip = ship;
  draggedShip = e.target;
  draggedShipLength = draggedShip.children.length;
};

const dragPrevent = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

const dragEnd = (e) => {
  if (selectedShip.shipPosition.length !== 0) e.target.remove();
};

// Render

const App = () => {

  // Create Player Grid

  const createGrid = () => {
    let cell;
    let cells = [];
    for(let i = 0; i < 100; i++) {
      cell = <div 
      key={i}
      id={i}
      onDragOver={(e) => dragPrevent(e)}
      onDrop={(e) => dragDrop(e)} ></div>
      cells.push(cell);
    }
    return cells;
  };

  const [playerCells, setPlayerCells] = useState(createGrid());
  let newCells = [...playerCells];
  
  const dragDrop = (e) => {
    e.preventDefault();
    let shipClass = selectedShip.shipName;
  
    if (selectedShip.isHorizontal) {
      for (let i = 0; i < draggedShipLength; i++) {
        const index = parseInt(e.target.id) - selectedShipElement + i;
        const newCell = React.cloneElement(playerCells[index], {className: shipClass}, null);
        newCells.splice(index, 1, newCell);
        selectedShip.shipPosition.push(index);
      }
  
    } else {
      for (let i = 0; i < draggedShipLength; i++) {
        const index = parseInt(e.target.id) - (selectedShipElement * 10) + (i * 10);
        const newCell = React.cloneElement(playerCells[index], {className: shipClass}, null);
        newCells.splice(index, 1, newCell);
        selectedShip.shipPosition.push(index);
      }
    }
    setPlayerCells([...newCells]);
  };

  return (
    <main className="App">
      <div className='playground'>
        <GridPlayer playerCells={playerCells} />   
        <GridComputer computerGameboard={computerGameboard} />
      </div>
      <div className='info-container'>
        <PlayerZone renderPlayerFleet={renderPlayerFleet} />
        <InfoZone />
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default App;
