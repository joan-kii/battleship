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
    playerCells.push(<div key={i}></div>);
  }
};
createGrid();

// Place Player Zone Fleet

const playerFleet = playerGameboard.shipsArray;

const shipDivs = (ship) => {
  const renderShipDivs = [];
  for(let i = 0; i < ship.shipLength; i++) {
    renderShipDivs.push(<div key={i} id={`${ship.shipName}-${i}`}></div>);
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
  return <div 
  className={`ship ${ship.shipName}-container`} 
  key={index} 
  draggable='true'
  onDoubleClick={(e) => rotateShip(e.target.parentNode, ship)}
  onMouseDown={(e) => handleMouseDown(e)}
  onDragStart={(e) => dragStart(e)}
  onDragOver={(e) => e.preventDefault()}
  onDragEnter={(e) => e.preventDefault()}
  onDragLeave={(e) => e.preventDefault()}
  onDrop={(e) => dragDrop(e)}
  onDragEnd={(e) => dragEnd(e)}
  >
    {shipDivs(ship)}
  </div>
});

// Drag and Drop Player Fleet

let selectedShipIndex;
let draggedShip;
let draggedShipLength;


const handleMouseDown = (e) => {
  selectedShipIndex = e.target.id;
};

const dragStart = (e) => {
  draggedShip = e.target;
  draggedShipLength = draggedShip.children.length;
};

const dragDrop = (e) => {
  console.log(e);
};

const dragEnd = (e) => {
  console.log(e);
};

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
