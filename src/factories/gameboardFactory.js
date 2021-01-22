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
    let isHited = false;
    for(let ship of shipsArray) {
      if(ship.shipPosition.includes(shotPlace)) {
        isHited = true;
        ship.hit(shotPlace);
      }
    }
    if (!isHited) missedShots.push(shotPlace);
    return missedShots;
  };

  const checkSunkenShips = () => {
    const sunkenShips = [];
    for(let ship of shipsArray) {
      if(ship.isSunk()) sunkenShips.push(ship);
    }
    return sunkenShips.length === shipsArray.length;
  };

  return { shipsArray, missedShots, placeShip, receiveAttack, checkSunkenShips };
};

export default gameboardFactory;