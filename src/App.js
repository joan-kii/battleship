import GridPlayer from './modules/GridPlayer';
import GridComputer from './modules/GridComputer';
import PlayerZone from './modules/PlayerZone';
import InfoZone from './modules/InfoZone';
import Footer from './modules/Footer';
import gameboardFactory from './factories/gameboardFactory';

const playerGameboard = gameboardFactory();
const computerGameboard = gameboardFactory();

/* const playerPositions = []; */
const computerPositions = [];

/* const playerTakenSpots = []; */
const computerTakenSpots = [];

const deployNavy = (navy, ship, takenSpots) => {
  let randomDirection = Math.random() < 0.5;
  let shipSpots = [];
  let direction = randomDirection ? 10 : 1;
  let randomStart = Math.round(Math.random() * (100 - (direction * ship.shipLength)));
  for (let i = 0; i < ship.shipLength; i++) {
    shipSpots.push(randomStart + i);
  }
  const isTaken = shipSpots.some(index => takenSpots.includes(index));
  const isAtRightEdge = shipSpots.some(index => index % 10 === 9);
  const isAtLeftEdge = shipSpots.some(index => index % 10 === 0);

  if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
    shipSpots.forEach(index => takenSpots.push(index));
    return navy.placeShip(ship, shipSpots[0], randomDirection);
  } else {
    deployNavy(navy, ship, takenSpots); 
  }
};

/* for (let ship of playerGameboard.shipsArray) {
  const playerShipPosition = deployNavy(playerGameboard, ship, playerTakenSpots);
  playerPositions.push(playerShipPosition);
} */

for (let ship of computerGameboard.shipsArray) {
  /* console.log('flota: ', computerGameboard, 'barco: ', ship, 'ocupados: ', computerTakenSpots) */
  const computerShipPosition = deployNavy(computerGameboard, ship, computerTakenSpots);
  computerPositions.push(computerShipPosition);
}

/* console.log(playerPositions) */
/* console.log(computerPositions) */

const App = () => {
  return (
    <main className="App">
      <div className='playground'>
        <GridPlayer />   
        <GridComputer />
      </div>
      <div className='info-container'>
        <PlayerZone playerGameboard={playerGameboard} />
        <InfoZone />
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default App;
