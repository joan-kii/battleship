import shipFactory from '../factories/shipFactory';

// Parameter validity

test('throw error if the parameter is not a string', () => {
  expect(() => shipFactory(123)).toThrow('pass a string with one of the ship names with the first letter capitalized: Destructor, Crucero, Submarino, Acorazado or Portaviones');
});

test('throw error if the parameter is not valid', () => {
  expect(() => shipFactory('oops')).toThrow('pass a string with one of the ship names with the first letter capitalized: Destructor, Crucero, Submarino, Acorazado or Portaviones');
});

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


// The ship is sunk

test('is the ship sunken', () => {
  const ship = shipFactory('Destructor');
  expect(ship.isSunk()).toBe(false);
});

// Hit the ship

test('hitting the ship but not sinking it', () => {
  const ship = shipFactory('Crucero');
  ship.hit(1);
  ship.hit(2);
  expect(ship.isSunk()).toBe(false);
});

// Hit the ship to sinking it

test('hitting the ship to sink it', () => {
  const ship = shipFactory('Submarino');
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);
  expect(ship.isSunk()).toBe(true);
});
