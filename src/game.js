import gameboardFactory from './factories/gameboardFactory';
import playerFactory from './factories/playerFactory';

const game = () => {
  const player = playerFactory('Jugador 1');
  const computer = playerFactory('Ordenador');
  const gameboardPlayer = gameboardFactory();
  const gameboardComputer = gameboardFactory();
  let turn = true;

  // For now place the fleets in predetermined coordinates

  let loop = 2;

  for(let ship of gameboardPlayer.shipsArray) {
    ship.shipPlace(ship.name, loop, true);
    loop += 10;
  }

  for(let ship of gameboardComputer.shipsArray) {
    ship.shipPlace(ship.name, loop, true);
    loop += 10;
  }
};