import React, { useState } from 'react';
import Game from './modules/Game';
import PlayerZone from './modules/PlayerZone';
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


// Create Computer Grid 

const computerCells = [];
const createComputerGrid = (computerShipsPositions) => {

  for(let i = 0; i < 100; i++) {
    computerCells.push(<div key={i} id={i} className='spot'></div>);
  }

  for (let ship of computerShipsPositions) {
    for (let cell of ship.positions) {
      computerCells[cell] = <div key={cell} id={cell} className={ship.ship}></div>;
    }
  }
  return computerCells;
};

const computerFleet = computerGameboard.shipsArray;
const computerShipsPositions = [];

for (let ship of computerFleet) {
  computerShipsPositions.push({
    ship: ship.shipName, 
    positions: ship.shipPosition
  });
}

createComputerGrid(computerShipsPositions);

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

  let takenSpots = [];

  const createGrid = () => {
    let cell;
    let cells = [];
    for(let i = 0; i < 100; i++) {
      cell = <div 
      key={i}
      id={i}
      className={'spot'}
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
    const notAllowedHorizontal = [
      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 
      1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 
      2, 12, 22, 32, 42, 52, 62, 72, 82, 92,
      3, 13, 23, 33, 43, 53, 63, 73, 83, 93
      ];        
    const notAllowedVertical = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
      10, 11, 12, 13, 14, 14, 16, 17, 18, 19, 
      20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49
      ];
    let shipClass = selectedShip.shipName;
    let lastShipId = selectedShip.shipLength - 1;
    
    if (selectedShip.isHorizontal) {
      let shipPlaces = [];
      for (let i = 0; i < draggedShipLength; i++) {
        shipPlaces.push((parseInt(e.target.id) - selectedShipElement) + i);
      }
      let arePlacesTaken = shipPlaces.some(place => takenSpots.includes(place));
      let lastShipIdPlacement = (parseInt(e.target.id) - selectedShipElement) + (selectedShip.shipLength - 1);
      let notAllowedSpots = notAllowedHorizontal.splice(0, 10 * lastShipId);
      let checkAllowedPlace = lastShipIdPlacement > 99 || notAllowedSpots.includes(lastShipIdPlacement) || arePlacesTaken;
      if (!checkAllowedPlace) {
        for (let i = 0; i < draggedShipLength; i++) {
          let index = parseInt(e.target.id) - selectedShipElement + i;
          let newCell = React.cloneElement(playerCells[index], {className: shipClass}, null);
          newCells.splice(index, 1, newCell);
          takenSpots.push(index);
          selectedShip.shipPosition.push(index);
        }
      }
  
    } else if (!selectedShip.isHorizontal) {
      let shipPlaces = [];
      for (let i = 0; i < draggedShipLength; i++) {
        shipPlaces.push((parseInt(e.target.id) - (selectedShipElement * 10)) + (i * 10));
      }
      let arePlacesTaken = shipPlaces.some(place => takenSpots.includes(place));
      let lastShipIdPlacement = parseInt(e.target.id) - ((selectedShipElement - (selectedShip.shipLength - 1)) * 10);
      let notAllowedSpots = notAllowedVertical.splice(0, 10 * lastShipId);
      let checkAllowedPlace = lastShipIdPlacement > 99 || notAllowedSpots.includes(lastShipIdPlacement) || arePlacesTaken;
      if (!checkAllowedPlace) {
        for (let i = 0; i < draggedShipLength; i++) {
          let index = parseInt(e.target.id) - (selectedShipElement * 10) + (i * 10);
          let newCell = React.cloneElement(playerCells[index], {className: shipClass}, null);
          newCells.splice(index, 1, newCell);
          takenSpots.push(index);
          selectedShip.shipPosition.push(index);
        }
      }
    } else return;

    if (takenSpots.length === 17) setShipsAreadyPlaced(true);

    setPlayerCells([...newCells]);
  };

  // Start Game 

  const [shipsAlreadyPlaced, setShipsAreadyPlaced] = useState(false);
  const [startGame, setStartGame] = useState(false);

  // Game Loop

  return (
    <main className="App">
      <Game 
        playerCells={playerCells}
        computerCells={computerCells}
        playerFleet={playerFleet}
        computerFleet={computerFleet}
        startGame={startGame} />
      <div className='info-container'>
        {!startGame && <PlayerZone 
          renderPlayerFleet={renderPlayerFleet}
          shipAlreadyPlaced={shipsAlreadyPlaced}
          setStartGame={setStartGame} />}
        
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default App;
