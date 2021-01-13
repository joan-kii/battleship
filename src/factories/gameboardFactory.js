import shipFactory from './shipFactory';

const gameboardFactory = () => {

  const destroyer = shipFactory('Destructor');
  const cruiser = shipFactory('Crucero');
  const submarine = shipFactory('Submarino');
  const battleship = shipFactory('Acorazado');
  const carrier = shipFactory('Portaviones');

  const shipsArray = [destroyer, cruiser, submarine, battleship, carrier];

  const placeShip = (ship, coords, isRotated) => {
    for(let i = 0; i < ship.length; i++) {
      if (isRotated) {
        ship.shipPosition.push(coords[0] + i);
      } else {
        ship.shipPosition.push(coords[1] + i);
      }
    }
  };

  return shipsArray;
};

export default gameboardFactory;