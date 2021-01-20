import GridPlayer from './modules/GridPlayer';
import GridComputer from './modules/GridComputer';
import PlayerZone from './modules/PlayerZone';
import InfoZone from './modules/InfoZone';
import Footer from './modules/Footer';
import gameboardFactory from './factories/gameboardFactory';

const playerGameboard = gameboardFactory();
const computerGameboard = gameboardFactory();

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

// Inputs

document.addEventListener('DOMContentLoaded', () => {
  const gridPlayer = document.querySelector('.gridPlayer');
  const gridComputer = document.querySelector('.gridComputer');
  const playerZone = document.querySelector('.playerZone');
  const infoZone = document.querySelector('.infoZone');
  const ships = document.querySelectorAll('.ship');
  const destroyer = document.querySelector('.Destructor-container');
  const cruiser = document.querySelector('.Crucero-container');
  const submarine = document.querySelector('.Submarino-container');
  const battleship = document.querySelector('.Acorazado-container');
  const carrier = document.querySelector('.Portaviones-container');
  const rotateShipsButton = document.querySelector('.rotateShips');
  const startButton = document.querySelector('.startButton');
  const turnDisplay = document.querySelector('.turnDisplay');
  const messages = document.querySelector('.messages');
});
