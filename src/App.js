import GridPlayer from './modules/GridPlayer';
import GridComputer from './modules/GridComputer';
import PlayerZone from './modules/PlayerZone';
import InfoZone from './modules/InfoZone';
import Footer from './modules/Footer';
import gameboardFactory from './factories/gameboardFactory';

const playerGameboard = gameboardFactory();
const computerGameboard = gameboardFactory();

const playerTakenSpots = [];
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

for (let ship of playerGameboard.shipsArray) {
  deployNavy(playerGameboard, ship, playerTakenSpots);
}

for (let ship of computerGameboard.shipsArray) {
  deployNavy(computerGameboard, ship, computerTakenSpots);
}

const App = () => {
  return (
    <main className="App">
      <div className='playground'>
        <GridPlayer playerGameboard={playerGameboard} />   
        <GridComputer computerGameboard={computerGameboard} />
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
