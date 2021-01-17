import GridPlayer from './GridPlayer';
import GridComputer from './GridComputer';
import PlayerZone from './PlayerZone';

const App = () => {
  return (
    <main className="App">
      <GridPlayer />   
      <GridComputer />
      <PlayerZone />
    </main>
  );
};

export default App;
