import shipFactory from './shipFactory';

const gameboardFactory = () => {

  const destroyer = shipFactory('Destructor');
  const cruiser = shipFactory('Crucero');
  const submarine = shipFactory('Submarino');
  const battleship = shipFactory('Acorazado');
  const carrier = shipFactory('Portaviones');

  const shipsArray = [destroyer, cruiser, submarine, battleship, carrier];
  const missedShots = [];
  
  const placeShip = (ship, coords, isRotated) => {
    for(let i = 0; i < ship.shipLength; i++) {
      if (isRotated) {
        ship.shipPosition.push(coords + i);
      } else {
        ship.shipPosition.push(coords + (i * 10));
      }
    }
    return ship.shipPosition;
  };

  const receiveAttack = (shotPlace) => {
    for(let ship of shipsArray) {
      if(ship.shipPosition.includes(shotPlace)) {
        ship.hit(shotPlace);
      }
    }
    return missedShots.push(shotPlace);
  };

  return { shipsArray,  missedShots, placeShip, receiveAttack };
};

export default gameboardFactory;