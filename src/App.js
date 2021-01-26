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

// Create Player Grid

const playerCells = [];
const createGrid = () => {
  
  for(let i = 0; i < 100; i++) {
    playerCells.push(
      <div 
      key={i}
      id={i}
      onDragStart={(e) => dragStart(e)}
      onDragOver={(e) => dragOver(e)}
      onDragEnter={(e) => dragEnter(e)}
      onDragLeave={(e) => dragLeave(e)}
      onDrop={(e) => dragDrop(e)}
      onDragEnd={(e) => dragEnd(e)}>
      </div>
    );
  }
};
createGrid();

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
    className={`ship ${ship.shipName}-container`} 
    draggable='true'
    onDoubleClick={(e) => rotateShip(e.target.parentNode, ship)}
    onMouseDown={(e) => handleMouseDown(e)}
    onDragStart={(e) => dragStart(e, ship)}>
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

const dragOver = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

const dragEnter = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

const dragLeave = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

const dragDrop = (e) => {
  let shipLastId = selectedShip.lastIdDiv;
  let shipClass = selectedShip.shipName;
  let shipPlaceId = shipLastId + parseInt(e.target.id);
  shipPlaceId -= selectedShipElement;
  console.log(shipClass)
  console.log(shipPlaceId)
  console.log(draggedShipLength)
  console.log(selectedShip)

  if (selectedShip.isHorizontal) {
    for (let i = 0; i < draggedShipLength; i++) {

      playerCells[parseInt(e.target.id) - selectedShipElement + i] = <div 
      key={parseInt(e.target.id) - selectedShipElement + i}
      id={parseInt(e.target.id) - selectedShipElement + i}
      className={shipClass + `-taken`}
      onDragStart={(e) => dragStart(e)}
      onDragOver={(e) => dragOver(e)}
      onDragEnter={(e) => dragEnter(e)}
      onDragLeave={(e) => dragLeave(e)}
      onDrop={(e) => dragDrop(e)}
      onDragEnd={(e) => dragEnd(e)}>
      </div>;

      selectedShip.shipPosition.push(parseInt(e.target.id) + i);

    } 
  } else if (!selectedShip.isHorizontal) {
    for (let i = 0; i < draggedShipLength; i++) {

      playerCells[parseInt(e.target.id) - selectedShipElement + i * 10] = <div 
      key={parseInt(e.target.id) - selectedShipElement + i * 10}
      id={parseInt(e.target.id) - selectedShipElement + i * 10}
      className={shipClass + `-taken`}
      onDragStart={(e) => dragStart(e)}
      onDragOver={(e) => dragOver(e)}
      onDragEnter={(e) => dragEnter(e)}
      onDragLeave={(e) => dragLeave(e)}
      onDrop={(e) => dragDrop(e)}
      onDragEnd={(e) => dragEnd(e)}>
      </div>;

      selectedShip.shipPosition.push(parseInt(e.target.id) - selectedShipElement + i * 10);

    }
  } else return;
};

const dragEnd = (e) => {
  /* console.log(e); */
};

// Render

const App = () => {
  return (
    <main className="App">
      <div className='playground'>
        <GridPlayer 
        playerGameboard={playerGameboard} 
        playerCells={playerCells} />   
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
