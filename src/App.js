import GridPlayer from './modules/GridPlayer';
import GridComputer from './modules/GridComputer';
import PlayerZone from './modules/PlayerZone';
import InfoZone from './modules/InfoZone';
import Footer from './modules/Footer';

const App = () => {
  return (
    <main className="App">
      <div className='playground'>
        <GridPlayer />   
        <GridComputer />
      </div>
      <div className='info-container'>
        <PlayerZone />
        <InfoZone />
      </div>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default App;
