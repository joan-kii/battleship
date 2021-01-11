import shipFactory from '../factories/shipFactory';

// Ship name and length

test('pass a ship name (Destructor) and returns an object with the name and the length', () => {
  expect(shipFactory('Destructor')).toMatchObject({shipName: 'Destructor', shipLength: 2});
});

test('pass a ship name (Crucero) and returns an object with the name and the length', () => {
  expect(shipFactory('Crucero')).toMatchObject({shipName: 'Crucero', shipLength: 3});
});

test('pass a ship name (Submarino) and returns an object with the name and the length', () => {
  expect(shipFactory('Submarino')).toMatchObject({shipName: 'Submarino', shipLength: 3});
});

test('pass a ship name (Acorazado) and returns an object with the name and the length', () => {
  expect(shipFactory('Acorazado')).toMatchObject({shipName: 'Acorazado', shipLength: 4});
});

test('pass a ship name (Portaviones) and returns an object with the name and the length', () => {
  expect(shipFactory('Portaviones')).toMatchObject({shipName: 'Portaviones', shipLength: 5});
});


// Ship is sunk

test('is the ship sunken', () => {
  const ship = shipFactory('Destructor');
  expect(ship.isSunk()).toBe(false);
});