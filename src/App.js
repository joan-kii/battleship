import GridPlayer from './modules/GridPlayer';
import GridComputer from './modules/GridComputer';
import PlayerZone from './modules/PlayerZone';
import InfoZone from './modules/InfoZone';
import Footer from './modules/Footer';
import gameboardFactory from './factories/gameboardFactory';

const playerGameboard = gameboardFactory();
const computerGameboard = gameboardFactory();

const computerTakenSpots = [];

const deployNavy = (navy) => {
  const randomDirection = Math.random() < 0.5;
  const shipSpots = [];
  const direction = randomDirection ? 10 : 1;
  let randomStart = 0;

  for (let ship of navy.shipsArray) {
    randomStart = Math.round(Math.random() * (100 - (direction * ship.shipLength)));
    for (let i of ship.shipLength) {
      shipSpots.push(randomStart + i);
    }
  }

  const isTaken = shipSpots.some(index => computerTakenSpots.includes(index));
  const isAtRightEdge = shipSpots.some(index => (randomStart + index) % 10 === 9);
  const isAtLeftEdge = shipSpots.some(index => (randomStart + index) % 10 === 0);

  if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
    shipSpots.forEach(index => computerTakenSpots.push(index));
    navy.placeShip()
  }
};

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
